export interface Course {
  name: string;
  color: string;
}

export interface Student {
  id: string;
  name: string;
  avatar: string;
  gpa: number;
  major: string;
  credits: number;
  courses: Course[];
}