import { createContext, useEffect, useState, type ReactNode } from 'react';
import type { Student } from '../types';
import type { SortOption } from '../components/SortControls';

const STORAGE_KEY = 'student-dashboard:students';

const studentData: Student[] = [
  {
    id: "22-10451-1",
    name: 'Ayesha Rahman',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Ayesha%20Rahman&backgroundColor=4f46e5',
    gpa: 3.42,
    major: 'Computer Science',
    credits: 96,
    courses: [
      { name: 'Data Structures', color: '#4f46e5' },
      { name: 'Operating Systems', color: '#0891b2' },
      { name: 'Web Technology', color: '#c2410c' },
    ],
  },
  {
    id: "23-51709-2",
    name: 'Soumik Das',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Soumik%20Das&backgroundColor=0891b2',
    gpa: 3.94,
    major: 'Software Engineering',
    credits: 84,
    courses: [
      { name: 'Software Design', color: '#7c3aed' },
      { name: 'Database Systems', color: '#15803d' },
    ],
  },
  {
    id: "22-11039-3",
    name: 'Nusrat Jahan',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Nusrat%20Jahan&backgroundColor=be185d',
    gpa: 2.98,
    major: 'Computer Science',
    credits: 108,
    courses: [
      { name: 'Machine Learning', color: '#be185d' },
      { name: 'Computer Networks', color: '#4f46e5' },
      { name: 'Linear Algebra', color: '#0f766e' },
    ],
  },
  {
    id: "22-11564-2",
    name: 'Rafiul Karim',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Rafiul%20Karim&backgroundColor=15803d',
    gpa: 3.68,
    major: 'Information Technology',
    credits: 72,
    courses: [
      { name: 'Cloud Computing', color: '#0891b2' },
      { name: 'Cyber Security', color: '#b91c1c' },
    ],
  },
];

interface StudentContextValue {
  students: Student[];
  visibleStudents: Student[];
  isLoading: boolean;
  query: string;
  setQuery: (value: string) => void;
  sortBy: SortOption;
  setSortBy: (value: SortOption) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  addStudent: (student: Student) => void;
  removeStudent: (id: string) => void;
}

export const StudentContext = createContext<StudentContextValue>({} as StudentContextValue);

interface StudentProviderProps {
  children: ReactNode;
}

export function StudentProvider({ children }: StudentProviderProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        try {
          setStudents(JSON.parse(stored));
        } catch {
          setStudents(studentData);
        }
      } else {
        setStudents(studentData);
      }

      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    }
  }, [students, isLoading]);

  const toggleFavorite = (studentId: string) => {
    setFavorites((previous) =>
      previous.includes(studentId)
        ? previous.filter((favoriteId) => favoriteId !== studentId)
        : [...previous, studentId]
    );
  };

  const addStudent = (student: Student) => {
    setStudents((previous) => [...previous, student]);
  };

  const removeStudent = (studentId: string) => {
    setStudents((previous) => previous.filter((student) => student.id !== studentId));
    setFavorites((previous) => previous.filter((favoriteId) => favoriteId !== studentId));
  };

  const normalizedQuery = query.trim().toLowerCase();

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(normalizedQuery) ||
      student.major.toLowerCase().includes(normalizedQuery)
  );

  const visibleStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === 'gpa') {
      return b.gpa - a.gpa;
    }
    return 0;
  });

  const value: StudentContextValue = {
    students,
    visibleStudents,
    isLoading,
    query,
    setQuery,
    sortBy,
    setSortBy,
    favorites,
    toggleFavorite,
    addStudent,
    removeStudent,
  };

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
}