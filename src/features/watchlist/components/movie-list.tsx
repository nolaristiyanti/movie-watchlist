"use client";

// import { useMovies } from "../hooks/use-movie";
// import { useMovieContext } from "../context/movie-context";
import { useWatchlist } from "../hooks/use-watchlist";
import { MovieForm } from "./movie-form";
import { useState } from "react";

export function MovieList() {
  // const { movies, loading, addMovie, deleteMovie, toggleWatched, updateMovie, } = useMovies();
  // const { movies, loading, addMovie, deleteMovie, toggleWatched, updateMovie, } = useMovieContext();
  const { movies, loading, addMovie, deleteMovie, toggleWatched, updateMovie, } = useWatchlist();
  const [editingMovieId, setEditingMovieId] = useState<number | null>(null);
  const editingMovie = movies.find((movie) => movie.id === editingMovieId);

  if (loading) {
    return <p>Loading movies...</p>;
  }

  return (
    <div>
      {/* <MovieForm onAddMovie={addMovie} /> */}
      <MovieForm
        onAddMovie={(input) => {
          if (editingMovieId) {
            updateMovie(editingMovieId, input);
            setEditingMovieId(null);
          } else {
            addMovie(input);
          }
        }}
        initialData={editingMovie}
        isEditing={!!editingMovieId}
      />

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

            <button onClick={() => setEditingMovieId(movie.id)}>
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}