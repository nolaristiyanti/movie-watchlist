import { Movie } from "../types/movie";

const API_URL = "https://jsonplaceholder.typicode.com";

export const movieApi = {
  async getMovies(): Promise<Movie[]> {
    const response = await fetch(`${API_URL}/posts`);

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();

    return data.slice(0, 10).map((item: any) => ({
      id: item.id,
      title: item.title,
      personalRating: Math.floor(Math.random() * 10) + 1,
      watched: false,
    }));
  },
};