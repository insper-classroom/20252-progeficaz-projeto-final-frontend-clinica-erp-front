// Component for displaying chart cards
import PropTypes from 'prop-types';

export default function ChartCard({ title, children, className = '' }) {
  return (
    <div className={`chart-card ${className}`}>
      <div className="chart-card-header">
        <h3 className="chart-card-title">{title}</h3>
      </div>
      <div className="chart-card-body">
        {children}
      </div>
    </div>
  );
}

ChartCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
