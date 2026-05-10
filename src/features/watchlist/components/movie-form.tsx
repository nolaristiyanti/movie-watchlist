"use client";

import { useEffect, useState } from "react";

type MovieFormProps = {
  onAddMovie: (input: {
    title: string;
    personalRating: number;
  }) => void;

  initialData?: {
    title: string;
    personalRating: number;
  };

  isEditing?: boolean;
};

export function MovieForm({ onAddMovie, initialData, isEditing }: MovieFormProps) {
  const [title, setTitle] = useState(
    initialData?.title || ""
  );

  const [rating, setRating] = useState(
    initialData?.personalRating || 0
  );

  // ketika klik edit pada parent  jalankan effect
  // ketika klik Update Movie jalankan effect
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setRating(initialData.personalRating);
    }
  }, [initialData]);

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
        {isEditing ? "Update Movie" : "Add Movie"}
      </button>
    </form>
  );
}