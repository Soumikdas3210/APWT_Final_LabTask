export interface Course {
  name: string;
  color: string;
}

export interface Student {
  id: number;
  name: string;
  avatar: string;
  gpa: number;
  major: string;
  credits: number;
  courses: Course[];
}