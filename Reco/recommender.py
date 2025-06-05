import ast

from fastapi import FastAPI
from typing import List
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from .read import (
    fetch_movies,
    fetch_movie_by_id,
    fetch_user_ratings,
    fetch_average_rating,
    fetch_top_rated_movies,
    fetch_genres,
)



app = FastAPI()

@app.get("/movies")
async def get_movies():
    return {"movies": fetch_movies()}



@app.get("/movie/{movie_id}")
async def get_movie(movie_id: int):
    movie = fetch_movie_by_id(movie_id)
    if movie:
        return {"movie": movie}
    return {"error": f"Movie with id {movie_id} not found"}




@app.get("/user_ratings/{user_id}")
async def get_user_ratings(user_id: int):
    ratings = fetch_user_ratings(user_id)
    return {"user_id": user_id, "rated_movies": ratings}




@app.get("/movie/{movie_id}/average_rating")
async def get_average_rating_route(movie_id: int):
    avg = fetch_average_rating(movie_id)
    if avg is not None:
        return {"movie_id": movie_id, "average_rating": avg}
    return {"error": f"No ratings found for movie id {movie_id}"}


@app.get("/top_rated_movies")
async def get_top_rated_movies(limit: int = 10):
    movies = fetch_top_rated_movies(limit)
    return {"top_rated_movies": movies}




@app.get("/recommendations/{user_id}")
async def get_recommendations(user_id: int, n_recommendations: int = 10, recent_weight_factor: float = 2.0):
    movies = fetch_movies()
    if not movies:
        return {"recommendations": []}

    movies_df = pd.DataFrame(movies)  

    user_ratings = fetch_user_ratings(user_id)
    if not user_ratings:
        return {"fromwhere":"came from fetch top rated movies","recommendations": fetch_top_rated_movies(n_recommendations)}


    genre_rows = fetch_genres()  # <-- Utilise la fonction ici
    genre_map = {row["id"]: row["name"] for row in genre_rows}

    def genres_ids_to_names(genre_ids):
        if not genre_ids:
            return ""
        if isinstance(genre_ids, str):
            try:
                genre_ids = ast.literal_eval(genre_ids)
            except Exception:
                return ""
        return " ".join([genre_map.get(gid, "") for gid in genre_ids if gid in genre_map])
    
    movies_df["genre_names"] = movies_df["genre"].apply(genres_ids_to_names)
    movies_df["combined_text"] = (
        movies_df["title"].fillna("") + " " +
        movies_df.get("description", pd.Series([""] * len(movies_df))).fillna("") + " " +
        movies_df.get("genre_names", pd.Series([""] * len(movies_df))).fillna("")
    )

    user_ratings_df = pd.DataFrame(user_ratings)
    user_ratings_df = user_ratings_df[user_ratings_df["ratingValue"].isin([-1, 1])].reset_index(drop=True)
    user_ratings_df["order_weight"] = (user_ratings_df.index + 1) / len(user_ratings_df)

    tfidf = TfidfVectorizer(stop_words="english", ngram_range=(1, 2), max_features=10000)
    tfidf_matrix = tfidf.fit_transform(movies_df["combined_text"])

    rated_movie_ids = user_ratings_df["movieId"].tolist()
    rated_indices = movies_df[movies_df["id"].isin(rated_movie_ids)].index

    if len(rated_indices) == 0:
        return {"recommendations": []}

    rated_vectors = tfidf_matrix[rated_indices]
    ratings = user_ratings_df["ratingValue"].values  # -1 or 1
    order_weights = user_ratings_df["order_weight"].values

    # Final user profile: weighted average of liked - disliked vectors
    weighted_vectors = rated_vectors.toarray() * ratings[:, np.newaxis] * order_weights[:, np.newaxis]
    user_profile = np.average(weighted_vectors, axis=0)

    cosine_sim = cosine_similarity(user_profile.reshape(1, -1), tfidf_matrix).flatten()
    movies_df["content_score"] = cosine_sim

    recommendations = (
        movies_df[~movies_df["id"].isin(rated_movie_ids)]
        .sort_values("content_score", ascending=False)
        .head(n_recommendations)
    )

    return {
        "recommendations": [
            {"id": row["id"], "title": row["title"]}
            for _, row in recommendations.iterrows()
        ]
    }