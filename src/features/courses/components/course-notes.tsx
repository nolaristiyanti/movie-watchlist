"use client";

import { useState } from "react";

import { useCourseNotes } from "../hooks/use-course-notes";

type CourseNotesProps = {
    topicId: string;
};

export function CourseNotes({topicId,}: CourseNotesProps) {
    // const { notes, status, error, createNote, deleteNote, } = useCourseNotes(topicId);
    const { notes, status, error, createNote, updateNote, deleteNote, } = useCourseNotes(topicId);

    const [title, setTitle] = useState("");

    const [body, setBody] = useState("");

    // state untuk simpan id note yang sedang diedit, null jika tidak ada
    const [editingNoteId, setEditingNoteId] = useState<number | null>(null);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (!title || !body) {
            return;
        }

        // await createNote({
        //     title,
        //     body,
        // });

        if (editingNoteId) {
            await updateNote(editingNoteId,
            {
                title,
                body,
            }
            );

            setEditingNoteId(null);
        } else {
            await createNote({
                title,
                body,
            });
        }

        setTitle("");
        setBody("");
    }

    if (status === "loading") {
        return <p>Loading notes...</p>;
    }

    if (status === "error") {
        return (
            <p>Error: {error}</p>
        );
    }

    return (
        <div>
            <h2>Course Notes</h2>

            <form onSubmit={handleSubmit} className="bg-gray-700 p-4 mb-4">
                <div className="border border-green-400">
                    <input
                        value={title}
                        onChange={(event) =>
                        setTitle(event.target.value)
                        }
                        placeholder="Note title"
                    />
                </div>

                <div className="border border-green-400">
                    <textarea
                    value={body}
                    onChange={(event) =>
                        setBody(event.target.value)
                    }
                    placeholder="Note body"
                    />
                </div>

                <button type="submit" className="bg-green-500 text-white px-4 py-2">
                    { editingNoteId ? "Update Note" : "Add Note" }
                </button>

                {
                    editingNoteId && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditingNoteId(null);

                                setTitle("");

                                setBody("");
                            }}
                        >
                            Cancel
                        </button>
                    )
                }
            </form>

            <div>
                {notes.map((note) => (
                    <div key={note.id}>
                        <h3>{note.title}</h3>

                        <p>{note.body}</p>

                        <button
                            onClick={() => {
                                setEditingNoteId(note.id);

                                setTitle(note.title);

                                setBody(note.body);
                            }}
                        >
                        Edit
                        </button>

                        <button
                            onClick={() =>
                            deleteNote(note.id)
                            }
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}