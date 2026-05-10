export type CourseTopic = {
  id: string;
  title: string;
  summary: string;
};

export type Course = {
  title: string;
  description: string;
  topics: CourseTopic[];
};