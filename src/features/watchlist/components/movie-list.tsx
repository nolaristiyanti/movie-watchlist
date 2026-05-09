"use client";

import { useMovies } from "../hooks/use-movie";

export function MovieList() {
  const { movies, loading } = useMovies();

  if (loading) {
    return <p>Loading movies...</p>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>
          <p>Rating: {movie.personalRating}/10</p>
        </div>
      ))}
    </div>
  );
}