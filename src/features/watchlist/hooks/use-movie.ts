"use client";

import { useEffect, useState } from "react";
import { movieApi } from "../services/movie-api";
import { Movie } from "../types/movie";
import { useLocalStorage } from "@/shared/hooks/use-local-storage";

type CreateMovieInput = {
  title: string;
  personalRating: number;
};

export function useMovies() {
  // const [movies, setMovies] = useState<Movie[]>([]);
  const [movies, setMovies] = useLocalStorage<Movie[]>("movies", []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      // kalau localStorage sudah ada data
      // tidak perlu fetch API lagi
      if (movies.length > 0) {
        setLoading(false);
        return;
      }

      try {
        const data = await movieApi.getMovies();
        setMovies(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  function addMovie(input: CreateMovieInput) {
    const newMovie: Movie = {
      id: Date.now(),
      title: input.title,
      personalRating: input.personalRating,
      watched: false,
    };

    setMovies((currentMovies) => [newMovie, ...currentMovies]);
  }

  function deleteMovie(id: number) {
    setMovies((currentMovies) =>
      currentMovies.filter((movie) => movie.id !== id)
    );
  }

  function toggleWatched(id: number) {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === id
          ? {
              ...movie,
              watched: !movie.watched,
            }
          : movie
      )
    );
  }

  function updateMovie(
    id: number,
    input: {
      title: string;
      personalRating: number;
    }
  ) {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === id
          ? {
              ...movie,
              title: input.title,
              personalRating: input.personalRating,
            }
          : movie
      )
    );
  }

  return {
    movies,
    loading,
    addMovie,
    deleteMovie,
    toggleWatched,
    updateMovie,
  };
}