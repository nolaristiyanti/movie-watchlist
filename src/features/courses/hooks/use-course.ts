"use client";

import { useEffect, useState } from "react";

import { courseApi } from "../services/course-api";

import type { Course } from "../types/course";

// union type : state hanya boleh salah satu dari: loading, success, atau error
type CourseState =
  | {
      status: "loading";
      course: null;
      error: null;
    }
  | {
      status: "success";
      course: Course;
      error: null;
    }
  | {
      status: "error";
      course: null;
      error: string;
    };

export function useCourse() {
    // inisialisasi state dengan status loading
    const [state, setState] = useState<CourseState>({
        status: "loading",
        course: null,
        error: null,
    });

    useEffect(() => {
        // fungsi untuk ambil data course
        async function loadCourse() {
            try {
            const data =
                await courseApi.getCourse();

            setState({
                status: "success",
                course: data,
                error: null,
            });
            } catch (error) {
            setState({
                status: "error",
                course: null,
                error:
                error instanceof Error
                    ? error.message
                    : "Failed to load course",
            });
            }
        }

        loadCourse();
    }, []);

    return state;
}