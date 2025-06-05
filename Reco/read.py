
import sqlite3
from fastapi import FastAPI
app = FastAPI()

# Chemin vers la base de données SQLite
DATABASE_PATH = "../backend/database.sqlite3"  

# Route pour récupérer tous les films
@app.get("/movies")
async def get_movies():
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row  # Permet d'obtenir les résultats sous forme de dictionnaires
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Movie")
    movies = [dict(row) for row in cursor.fetchall()]  # Conversion des résultats en liste de dictionnaires
    conn.close()
    return movies

# Route pour récupérer un film par son id
@app.get("/movie/{movie_id}")
async def get_movie(movie_id: int):
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Movie WHERE id = ?", (movie_id,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return  dict(row)
    else:
        return {"error": f"Movie with id {movie_id} not found"}


# Route pour récupérer les films notés par un utilisateur et leurs notes
@app.get("/user_ratings/{user_id}")
async def get_user_ratings(user_id: int):
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("""
        SELECT Movie.*, Rating.ratingValue
        FROM Rating
        JOIN Movie ON Rating.movieId = Movie.id
        WHERE Rating.userId = ?
    """, (user_id,))
    results = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return results


# Route pour obtenir la note moyenne d'un film
@app.get("/movie/{movie_id}/average_rating")
async def get_average_rating(movie_id: int):
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT AVG(ratingValue) FROM Rating WHERE movieId = ?", (movie_id,))
    avg = cursor.fetchone()[0]
    conn.close()
    if avg is not None:
        return avg
    

# Route pour récupérer les films les mieux notés
@app.get("/top_rated_movies")
async def get_top_rated_movies(limit: int = 10):
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("""
        SELECT Movie.*, AVG(Rating.ratingValue) as average_rating
        FROM Movie
        JOIN Rating ON Movie.id = Rating.movieId
        GROUP BY Movie.id
        ORDER BY average_rating DESC
        LIMIT ?
    """, (limit,))
    results = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return [movie["id"] for movie in results]