from .import read 
import sqlite3
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

@read.app.get("/recommendations/{user_id}")
async def get_recommendations(
    user_id: int,
    n_recommendations: int = 10,
    recent_weight_factor: float = 2.0
):
    """
    Recommande des films à un utilisateur selon la similarité de contenu,
    en donnant plus de poids aux notes récentes.
    """
    # Connexion à la base SQLite
    conn = sqlite3.connect(read.DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    #  Charger tous les films
    movies=read.get_movies()
    if not movies:
        conn.close()
        return {"recommendations": []}
    

    #Préparer le DataFrame des films avec un champ texte combiné
    movies_df = pd.DataFrame(movies)
    movies_df["combined_text"] = (
        movies_df["title"].fillna('') + " " +
        movies_df.get("description", pd.Series(['']*len(movies_df))).fillna('') + " " +
        movies_df.get("genre", pd.Series(['']*len(movies_df))).fillna('')
    )

    # Charger les notes de l'utilisateur
    user_ratings = read.get_user_ratings(user_id)
    if not user_ratings:
        # Si pas de notes, recommander les films les mieux notés globalement
        cursor.execute("""
            SELECT Movie.id, AVG(Rating.ratingValue) as avg_rating
             FROM Movie
             JOIN Rating ON Movie.id = Rating.movieId
            GROUP BY Movie.id
            ORDER BY avg_rating DESC
            LIMIT ?
        """, (n_recommendations,))
        popular = [row["id"] for row in cursor.fetchall()]
        conn.close()
        return {"recommendations": popular}

    #  Préparer le DataFrame des notes utilisateur
    user_ratings_df = pd.DataFrame(user_ratings)
    user_ratings_df = user_ratings_df[user_ratings_df["ratingValue"] > 0]
    user_ratings_df = user_ratings_df.reset_index(drop=True)
    user_ratings_df["order_weight"] = (user_ratings_df.index + 1) / len(user_ratings_df)

    #  Vectorisation TF-IDF du texte combiné des films
    tfidf = TfidfVectorizer(stop_words="english", ngram_range=(1, 2), max_features=10000)
    tfidf_matrix = tfidf.fit_transform(movies_df["combined_text"])

    #  Calcul du profil utilisateur à partir des films notés
    rated_movie_ids = user_ratings_df["movieId"].tolist()
    rated_indices = movies_df[movies_df["id"].isin(rated_movie_ids)].index
    if len(rated_indices) == 0:
        conn.close()
        return {"recommendations": []}

    rated_vectors = tfidf_matrix[rated_indices]
    ratings = user_ratings_df["ratingValue"].values
    order_weights = user_ratings_df["order_weight"].values
    combined_weights = ((ratings - 1) / 4) * (1 + (recent_weight_factor - 1) * order_weights)
    avg_vector = np.average(rated_vectors.toarray(), axis=0, weights=combined_weights)

    #  Calcul de la similarité cosinus entre le profil utilisateur et tous les films
    cosine_sim = cosine_similarity(avg_vector.reshape(1, -1), tfidf_matrix).flatten()
    movies_df["content_score"] = cosine_sim

    #  Sélection des meilleurs films non déjà notés par l'utilisateur
    recommendations = (
        movies_df[~movies_df["id"].isin(rated_movie_ids)]
        .sort_values("content_score", ascending=False)
        .head(n_recommendations)
    )

    conn.close()
    # Retourne la liste des IDs recommandés
    return {"recommendations": recommendations["id"].tolist()}
app = read.app