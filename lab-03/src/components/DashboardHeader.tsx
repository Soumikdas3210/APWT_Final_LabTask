import { useContext } from 'react';
import StatBadge from './StatBadge';
import { ThemeContext } from '../context/ThemeContext';
import {StudentContext} from '../context/StudentContext';

interface DashboardHeaderProps {
  title: string;
  tagline: string;
  navItems: string[];
}

function DashboardHeader({ title, tagline, navItems }: DashboardHeaderProps) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { students, favorites } = useContext(StudentContext);

  const averageGpa = students.length 
    ? (students.reduce((sum, student) => sum + student.gpa, 0) / students.length).toFixed(2)
    : '0.00';

  return (
    <header className="header">
      <div className="container header-inner">
        <div className="brand">
          <span className="brand-mark">SD</span>
          <div>
            <h1 className="brand-title">{title}</h1>
            <p className="brand-tagline">{tagline}</p>
          </div>
        </div>

        <nav className="nav">
          {navItems.map((item, index) => (
            <a
              key={item}
              href="#"
              className={index === 0 ? 'nav-link nav-link-active' : 'nav-link'}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="header-stats">
          <StatBadge label="Students" value={students.length} />
          <StatBadge label="Avg GPA" value={averageGpa} />
          <StatBadge label="Favorites" value={favorites.length} accent />
        </div>

        <button type="button" className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '☾ Dark mode' : '☀ Light mode'}
        </button>
      </div>
    </header>
  );
}

export default DashboardHeader;