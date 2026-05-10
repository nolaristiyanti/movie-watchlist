"use client";

import { useMovieContext } from "../context/movie-context";

export function useWatchlist() {
  return useMovieContext();
}