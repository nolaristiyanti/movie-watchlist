"use client";

import { useMovieContext } from "../context/movie-context";

export function MovieStats() {
  const { movies } = useMovieContext();

  const watchedMovies =
    movies.filter((movie) => movie.watched);

  const unwatchedMovies =
    movies.filter((movie) => !movie.watched);

  return (
    <div>
      <h2>Movie Stats</h2>

      <p>
        Total Movies: {movies.length}
      </p>

      <p>
        Watched Movies: {watchedMovies.length}
      </p>

      <p>
        Unwatched Movies: {unwatchedMovies.length}
      </p>
    </div>
  );
}