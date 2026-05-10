import { MovieList } from "@/features/watchlist/components/movie-list";
import { MovieProvider } from "@/features/watchlist/context/movie-context";
import { MovieStats } from "@/features/watchlist/components/movie-stats";

export default function HomePage() {
  return (
    <MovieProvider>
      <main>
        <h1>Movie Watchlist</h1>

        <MovieStats />

        <MovieList />
      </main>
    </MovieProvider>
  );
}