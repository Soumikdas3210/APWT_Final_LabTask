import PropTypes from 'prop-types';

interface CourseTagProps {
  courseName: string;
  color?: string;
}

function CourseTag({ courseName, color = '#4f46e5' }: CourseTagProps) {
  return (
    <span className="course-tag" style={{ '--tag-color': color } as React.CSSProperties}>
      {courseName}
    </span>
  );
}

CourseTag.propTypes = {
  courseName: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default CourseTag;