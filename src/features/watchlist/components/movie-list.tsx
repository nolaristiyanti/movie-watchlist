"use client";

import { useMovies } from "../hooks/use-movie";
import { MovieForm } from "./movie-form";

export function MovieList() {
  const { movies, loading, addMovie } = useMovies();

  if (loading) {
    return <p>Loading movies...</p>;
  }

  return (
    <div>
      <MovieForm onAddMovie={addMovie} />

      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <h3>{movie.title}</h3>
            <p>Rating: {movie.personalRating}/10</p>
          </div>
        ))}
      </div>
    </div>
  );
}