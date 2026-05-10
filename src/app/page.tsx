import { MovieList } from "@/features/watchlist/components/movie-list";
import { MovieProvider } from "@/features/watchlist/context/movie-context";

export default function HomePage() {
  return (
    <MovieProvider>
      <main>
        <h1>Movie Watchlist</h1>

        <MovieList />
      </main>
    </MovieProvider>
  );
}