import { Course } from "../types/course";

export const courseApi = {
  async getCourse(): Promise<Course> {
    return {
      title: "Mastering React",
      description:
        "Learn advanced React concepts",
      topics: [
        {
          id: "1",
          title: "Context API",
          summary:
            "Learn shared state management",
        },
        {
          id: "2",
          title: "Custom Hooks",
          summary:
            "Learn reusable logic",
        },
      ],
    };
  },
};