import PropTypes from 'prop-types';

interface StatBadgeProps {
  label: string;
  value: string | number;
  accent?: boolean;
}

function StatBadge({ label, value, accent = false }: StatBadgeProps) {
  return (
    <div className={accent ? 'stat-badge stat-badge-accent' : 'stat-badge'}>
      <span className="stat-badge-label">{label}</span>
      <span className="stat-badge-value">{value}</span>
    </div>
  );
}

StatBadge.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  accent: PropTypes.bool,
};

export default StatBadge;