"use client";

import { useEffect, useState } from "react";
import { movieApi } from "../services/movie-api";
import { Movie } from "../types/movie";

type CreateMovieInput = {
  title: string;
  personalRating: number;
};

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
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

  return {
    movies,
    loading,
    addMovie,
  };
}