"use client";

import {
  createContext,    // membuat context
  useContext,       // mengambil isi context
} from "react";

// context akan memakai state dari useMovies
import { useMovies } from "../hooks/use-movie";

// ambil type dari return function useMovies
type MovieContextValue =
  ReturnType<typeof useMovies>;
// {
//   movies: Movie[],
//   loading: boolean,
//   addMovie: ...
// }

// Buat context dengan nilai awal null, nanti akan diisi oleh MovieProvider
const MovieContext = createContext<MovieContextValue | null>(null);

type MovieProviderProps = {
  children: React.ReactNode; // tipe untuk children (Semua component di dalam provider)
};

export function MovieProvider({children}: MovieProviderProps) {
  const movieState = useMovies(); // Provider akan memanggil useMovies dan menyimpan hasilnya di movieState

  // MovieContext.Provider akan menyediakan nilai movieState ke semua component anaknya
  // Semua component di dalam provider: bisa akses movieState
  return (
    <MovieContext.Provider value={movieState}> 
      {children} {/* Render semua component anak dalam provider */}
    </MovieContext.Provider>
  );
}

// custom hook untuk mengambil context dengan pengecekan error jika digunakan di luar provider
// tanpa hook ini, haurs useContext(MovieContext) terus menerus
// dengan hook ini, cukup useMovieContext()
export function useMovieContext() {
  const context = useContext(MovieContext); // Ambil isi context, Ambil data dari MovieContext

  // kalau component tidak dibungkus provider: context = null
  if (!context) {
    throw new Error(
      "useMovieContext must be used inside MovieProvider"
    );
  }

  return context;
}