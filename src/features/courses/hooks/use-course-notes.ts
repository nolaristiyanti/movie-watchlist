"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { courseNoteApi } from "../services/course-note-api";

import type { CourseNote } from "../types/course";

// bentuk data yang dikembalikan hook
type UseCourseNotesResult = {
    notes: CourseNote[];

    status: | "idle" | "loading" | "success" | "error"; // belum ngapa-ngapain | sedang fetch | berhasil fetch | gagal fetch

    error: string | null;

    createNote: (input: {
        title: string;
        body: string;
    }) => Promise<void>;

    updateNote: (
        id: number,
        input: {
            title: string;
            body: string;
        }
    ) => Promise<void>;

    deleteNote: (id: number) => Promise<void>;
};

export function useCourseNotes(topicId: string): UseCourseNotesResult {
    // state untuk simpan data notes
    const [notes, setNotes] = useState<CourseNote[]>([]);

    // state untuk tahu current kondisi async
    const [status, setStatus] = useState<UseCourseNotesResult["status"]>("idle");

    // state untuk simpan pesan error jika fetch gagal
    const [error, setError] = useState<string | null>(null);

    // function untuk load notes dari API berdasarkan topicId
    const loadNotes = useCallback(
        async () => {
            setStatus("loading");

            setError(null);

            try {
                const data = await courseNoteApi.getNotes(topicId);

                setNotes(data);

                setStatus("success");
            } catch (error) {
                setStatus("error");

                setError(
                error instanceof Error
                    ? error.message
                    : "Failed to load notes"
                );
            }
        },
        [topicId]
    );

    // panggil loadNotes saat pertama kali render atau topicId berubah
    useEffect(() => {
        loadNotes();
    }, [loadNotes]);

    // function untuk buat note baru
    async function createNote(input: {
        title: string;
        body: string;
    }) {
        await courseNoteApi.createNote({
            topicId,
            title: input.title,
            body: input.body,
        });

        await loadNotes();
    }

    async function updateNote(
        id: number,
        input: {
            title: string;
            body: string;
        }
    ) {
        await courseNoteApi.updateNote(id,input);
        await loadNotes();
    }

    async function deleteNote(id: number) {
        await courseNoteApi.deleteNote(id);

        await loadNotes();
    }

    return {
        notes,
        status,
        error,
        createNote,
        updateNote,
        deleteNote,
    };
}