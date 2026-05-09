"use client";

import { useMovies } from "../hooks/use-movie";
import { MovieForm } from "./movie-form";

export function MovieList() {
  const { movies, loading, addMovie, deleteMovie, toggleWatched } = useMovies();

  if (loading) {
    return <p>Loading movies...</p>;
  }

  return (
    <div>
      <MovieForm onAddMovie={addMovie} />

      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <h3 style={{ textDecoration: movie.watched ? "line-through" : "none", }} d>
              {movie.title}
            </h3>
            <p>Rating: {movie.personalRating}/10</p>

            <button onClick={() => deleteMovie(movie.id)}>
              Delete
            </button>

            <button onClick={() => toggleWatched(movie.id)}>
              {movie.watched ? "Watched" : "Unwatched"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}