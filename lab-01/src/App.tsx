import type { Student } from './types';
import StatBadge from './components/StatBadge';
import CourseTag from './components/CourseTag';

const students: Student[] = [
  {
    id: 2210451,
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
    id: 2210872,
    name: 'Tanvir Hasan',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Tanvir%20Hasan&backgroundColor=0891b2',
    gpa: 3.94,
    major: 'Software Engineering',
    credits: 84,
    courses: [
      { name: 'Software Design', color: '#7c3aed' },
      { name: 'Database Systems', color: '#15803d' },
    ],
  },
  {
    id: 2211039,
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
    id: 2211564,
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
  return (
    <div className="container" style={{ paddingTop: 32 }}>
      <p>Students loaded: {students.length}</p>

      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        <StatBadge label="GPA" value="3.42" />
        <StatBadge label="Credits" value={96} accent />
      </div>

      <div className="tag-row" style={{ marginTop: 16 }}>
        {students[0].courses.map((course, index) => (
          <CourseTag key={`${course.name}-${index}`} courseName={course.name} color={course.color} />
        ))}
      </div>
    </div>
  );
}

export default App;