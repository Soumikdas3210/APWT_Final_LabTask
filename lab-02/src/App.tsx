import { useEffect, useState } from 'react';
import type { Student } from './types';
import StudentCard from './components/StudentCard';
import DashboardHeader from './components/DashboardHeader';
import StatBadge from './components/StatBadge';
import SearchBar from './components/SearchBar';
import SortControls, { type SortOption } from './components/SortControls';
import LoadingSpinner from './components/LoadingSpinner';

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

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setStudents(studentData);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timerId);
  }, []);

  const handleFavoriteChange = (studentId: string, isFavorite: boolean) => {
    setFavorites((previous) =>
      isFavorite
        ? [...previous, studentId]
        : previous.filter((favoriteId) => favoriteId !== studentId)
    );
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

  useEffect(() => {
    document.title = `Dashboard — ${visibleStudents.length} Students`;
  }, [visibleStudents.length]);
  

  const totalCredits = students.reduce((sum, student) => sum + student.credits, 0);
  const averageGpa = students.length
    ? (students.reduce((sum, student) => sum + student.gpa, 0) / students.length).toFixed(2)
    : '0.00';
  //const majorCount = new Set(students.map((student) => student.major)).size;

  return (
    <div className="app">
      <DashboardHeader
        title="Student Dashboard"
        tagline="Academic records at a glance"
        navItems={['Overview', 'Students', 'Courses', 'Reports']}
        totalStudents={students.length}
        averageGpa={averageGpa}
        favoriteCount={favorites.length}
      />

      <main className="container page">
        <div className="section-head">
          <div>
            <h2 className="section-title">Enrolled Students</h2>
            <p className="section-subtitle">Spring 2026 · Faculty of Science and Technology</p>
          </div>
          <div className="badge-row">
            <StatBadge label="Total Credits" value={totalCredits} />
            <StatBadge label="Showing" value={visibleStudents.length} />
          </div>
        </div>

        <div className="toolbar">
          <SearchBar query={query} onQueryChange={setQuery} />
          <SortControls sortBy={sortBy} onSortChange={setSortBy} />
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : visibleStudents.length === 0 ? (
          <p className="empty-state">No students match "{query}". Try another name or major.</p> 
        ) : (
          <div className="student-grid">
            {visibleStudents.map((student) => (
              <StudentCard
                key={student.id}
                name={student.name}
                id={student.id}
                avatar={student.avatar}
                gpa={student.gpa}
                major={student.major}
                credits={student.credits}
                courses={student.courses}
                initialFavorite={favorites.includes(student.id)}
                onFavoriteChange={handleFavoriteChange}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;