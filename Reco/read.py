import sqlite3

DATABASE_PATH = "../backend/database.sqlite3"

def fetch_movies():
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Movie")
    movies = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return movies

def fetch_movie_by_id(movie_id: int):
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Movie WHERE id = ?", (movie_id,))
    row = cursor.fetchone()
    conn.close()
    return dict(row) if row else None

def fetch_user_ratings(user_id: int):
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("""
        SELECT Movie.*, Rating.ratingValue, Rating.movieId
        FROM Rating
        JOIN Movie ON Rating.movieId = Movie.id
        WHERE Rating.userId = ?
    """, (user_id,))
    results = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return results

def fetch_average_rating(movie_id: int):
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT AVG(ratingValue) FROM Rating WHERE movieId = ?", (movie_id,))
    avg = cursor.fetchone()[0]
    conn.close()
    return avg

def fetch_top_rated_movies(limit: int = 10):
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("""
        SELECT Movie.id, AVG(Rating.ratingValue) as avg_rating
        FROM Movie
        JOIN Rating ON Movie.id = Rating.movieId
        GROUP BY Movie.id
        HAVING avg_rating > 0
        ORDER BY avg_rating DESC
        LIMIT ?
    """, (limit,))
    rated_movies = [row["id"] for row in cursor.fetchall()]
    if len(rated_movies) < limit:
        cursor.execute("""
            SELECT Movie.id
            FROM Movie
            LEFT JOIN Rating ON Movie.id = Rating.movieId
            WHERE Rating.movieId IS NULL
            LIMIT ?
        """, (limit - len(rated_movies),))
        unrated_movies = [row["id"] for row in cursor.fetchall()]
        rated_movies.extend(unrated_movies)

    conn.close()
    return rated_movies

def fetch_genres():
    import sqlite3
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT id, name FROM genre")
    genres = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return genres