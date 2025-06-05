
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
    return {"movies": movies}

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
        return {"movie": dict(row)}
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
    return {"user_id": user_id, "rated_movies": results}


# Route pour obtenir la note moyenne d'un film
@app.get("/movie/{movie_id}/average_rating")
async def get_average_rating(movie_id: int):
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT AVG(ratingValue) FROM Rating WHERE movieId = ?", (movie_id,))
    avg = cursor.fetchone()[0]
    conn.close()
    if avg is not None:
        return {"movie_id": movie_id, "average_rating": avg}
    else:
        return {"error": f"No ratings found for movie id {movie_id}"}
