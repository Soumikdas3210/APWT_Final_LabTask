import { useState } from 'react';
import type { Course } from '../types';
import CourseTag from './CourseTag';
import StatBadge from './StatBadge';

interface StudentCardProps {
  name: string;
  id: string;
  avatar: string;
  gpa: number;
  major: string;
  credits: number;
  courses: Course[];
  initialFavorite?: boolean;
  onFavoriteChange: (id: string, isFavorite: boolean) => void;
}

function StudentCard({ name, id, avatar, gpa, major, credits, courses, initialFavorite = false, onFavoriteChange }: StudentCardProps) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const accent = courses.length > 0 ? courses[0].color : '#4f46e5';

  const handleFavoriteClick = () => {
    const nextValue = !isFavorite;
    setIsFavorite(nextValue);
    onFavoriteChange(id, nextValue);
  };

  return (
    <article className="card" style={{ '--card-accent': accent } as React.CSSProperties}>
      <div className="card-header-row">
        <div className="card-top">
          <img className="avatar" src={avatar} alt={name} />
          <div>
            <h3 className="card-name">{name}</h3>
            <p className="card-meta">
              <span className="card-id">{id}</span> · {major}
            </p>
          </div>
        </div>

        <button
          type="button"
          className={isFavorite ? 'favorite-button favorite-button--active' : 'favorite-button'}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>

      <div className="card-stats">
        <StatBadge label="GPA" value={gpa.toFixed(2)} />
        <StatBadge label="Credits" value={credits} />
      </div>

      <div>
        <p className="card-label">Enrolled Courses</p>
        <div className="tag-row">
          {courses.map((course, index) => (
            <CourseTag key={`${course.name}-${index}`} courseName={course.name} color={course.color} />
          ))}
        </div>
      </div>
    </article>
  );
}

export default StudentCard;