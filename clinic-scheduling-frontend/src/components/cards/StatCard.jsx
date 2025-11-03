// Component for displaying statistics cards
import PropTypes from 'prop-types';

export default function StatCard({ title, value, icon, trend, trendValue }) {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <div className="stat-card-icon">
          {icon}
        </div>
        <div className="stat-card-content">
          <h3 className="stat-card-value">{value}</h3>
          <p className="stat-card-title">{title}</p>
          {trend && (
            <span className={`stat-card-trend ${trend === 'up' ? 'trend-up' : 'trend-down'}`}>
              {trend === 'up' ? '↑' : '↓'} {trendValue}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node.isRequired,
  trend: PropTypes.oneOf(['up', 'down']),
  trendValue: PropTypes.string,
};
