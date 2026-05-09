"use client";

import { useState } from "react";

type MovieFormProps = {
  onAddMovie: (input: {
    title: string;
    personalRating: number;
  }) => void;
};

export function MovieForm({ onAddMovie }: MovieFormProps) {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    onAddMovie({
      title,
      personalRating: rating,
    });

    setTitle("");
    setRating(0);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-blue-500 text-white p-4 rounded shadow mb-4">
      <div>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Movie title"
        />
      </div>

      <div>
        <input
          type="number"
          value={rating}
          onChange={(event) => setRating(Number(event.target.value))}
          placeholder="Rating"
        />
      </div>

      <button type="submit">
        Add Movie
      </button>
    </form>
  );
}