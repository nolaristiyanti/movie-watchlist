"use client";

import { useCourse } from "../hooks/use-course";
import { CourseNotes } from "./course-notes";

export function CourseDashboard() {
    // panggil custom hook untuk ambil data course
    const state = useCourse();

    // Kondisi 1: jika status loading, tampilkan pesan loading
    if (state.status === "loading") {
        return <p>Loading course...</p>;
    }

    // Kondisi 2: jika status error, tampilkan pesan error
    if (state.status === "error") {
        return (
        <p>
            Error: {state.error}
        </p>
        );
    }

    // Kondisi 3: jika status success, tampilkan data course
    return (
        <div>
            <h1>
                {state.course.title}
            </h1>

            <p>
                {state.course.description}
            </p>

            <div>
                {state.course.topics.map(
                    (topic) => (
                        <div key={topic.id}>
                            <h3>{topic.title}</h3>

                            <p>
                                {topic.summary}
                            </p>

                            <CourseNotes topicId={topic.id} />
                        </div>
                    )
                )}
            </div>
        </div>
    );
}