import type { Student } from './types';
import StudentCard from './components/StudentCard';
import DashboardHeader from './components/DashboardHeader';
import StatBadge from './components/StatBadge';


const students: Student[] = [
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
  const totalCredits = students.reduce((sum, student) => sum + student.credits, 0);
  const averageGpa = (
    students.reduce((sum, student) => sum + student.gpa, 0) / students.length
  ).toFixed(2);
  const majorCount = new Set(students.map((student) => student.major)).size;

  return (
    <div className="app">
      <DashboardHeader
        title="Student Dashboard"
        tagline="Academic records at a glance"
        navItems={['Overview', 'Students', 'Courses', 'Reports']}
        totalStudents={students.length}
        averageGpa={averageGpa}
      />

      <main className="container page">
        <div className="section-head">
          <div>
            <h2 className="section-title">Enrolled Students</h2>
            <p className="section-subtitle">Spring 2026 · Faculty of Science and Technology</p>
          </div>
          <div className="badge-row">
            <StatBadge label="Total Credits" value={totalCredits} />
            <StatBadge label="Majors" value={majorCount} />
          </div>
        </div>

        <div className="student-grid">
          {students.map((student) => (
            <StudentCard
              key={student.id}
              name={student.name}
              id={student.id}
              avatar={student.avatar}
              gpa={student.gpa}
              major={student.major}
              credits={student.credits}
              courses={student.courses}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;