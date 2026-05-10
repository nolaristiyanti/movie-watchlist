import type { CourseNote } from "../types/course";

// Data dummy notes
let notes: CourseNote[] = [];

// kumpulan function API / backend endpoint
export const courseNoteApi = {
    // function untuk ambil semua notes berdasarkan topicId
    async getNotes(topicId: string): Promise<CourseNote[]> {
        return notes.filter((note) => note.topicId === topicId);
    },

    // function untuk buat note baru
    async createNote(input: {
        topicId: string;
        title: string;
        body: string;
    }): Promise<void> {
        // tambah di index pertama array
        notes.unshift({
            id: Date.now(),
            topicId: input.topicId,
            title: input.title,
            body: input.body,
        });
    },

    // function untuk update note berdasarkan id
    async updateNote(
        id: number,
        input: {
        title: string;
        body: string;
        }
    ): Promise<void> {
        notes = notes.map((note) =>
            note.id === id
                ? {
                    ...note,
                    title: input.title,
                    body: input.body,
                }
                : note
        );
    },

    // function untuk delete note berdasarkan id
    async deleteNote(id: number): Promise<void> {
        notes = notes.filter((note) => note.id !== id);
    },
};