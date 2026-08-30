import StatBadge from './StatBadge';

interface DashboardHeaderProps {
  title: string;
  tagline: string;
  navItems: string[];
  totalStudents: number;
  averageGpa: string;
  favoriteCount: number;
}

function DashboardHeader({ title, tagline, navItems, totalStudents, averageGpa, favoriteCount }: DashboardHeaderProps) {
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
          <StatBadge label="Students" value={totalStudents} />
          <StatBadge label="Avg GPA" value={averageGpa} accent />
          <StatBadge label="Favorites" value={favoriteCount} accent />
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;