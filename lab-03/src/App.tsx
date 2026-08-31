import { useEffect, useContext } from 'react';
import StudentCard from './components/StudentCard';
import DashboardHeader from './components/DashboardHeader';
import StatBadge from './components/StatBadge';
import SearchBar from './components/SearchBar';
import SortControls from './components/SortControls';
import LoadingSpinner from './components/LoadingSpinner';
import { StudentContext } from './context/StudentContext';
import AddStudentForm from './components/AddStudentForm';


function App() {
  const { students, visibleStudents, isLoading, query } = useContext(StudentContext);

  useEffect(() => {
    document.title = `Dashboard — ${visibleStudents.length} Students`;
  }, [visibleStudents.length]);

  const totalCredits = students.reduce((sum, student) => sum + student.credits, 0);

  return (
    <div className="app">
      <DashboardHeader
        title="Student Dashboard"
        tagline="Academic records at a glance"
        navItems={['Overview', 'Students', 'Courses', 'Reports']}
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
          <SearchBar />
          <SortControls />
        </div>

        <div className="layout">
          <div>
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
                  />
                ))}
              </div>
            )}
          </div>

          <AddStudentForm />
        </div>
      </main>
    </div>
  );
}

export default App;