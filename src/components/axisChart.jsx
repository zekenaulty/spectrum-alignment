import PropTypes from 'prop-types';

const AxisChart = ({ axesResults }) => {
  // For simplicity, just display axis scores.
  // In a real scenario, integrate with a chart library (e.g. Chart.js).
  return (
    <div className="mb-4">
      <h3>Score Visualization</h3>
      <ul>
        {Object.keys(axesResults).map(axisKey => (
          <li key={axisKey}>
            {axisKey}: {axesResults[axisKey].finalScore.toFixed(2)} ({axesResults[axisKey].classification})
          </li>
        ))}
      </ul>
    </div>
  );
};

AxisChart.propTypes = {
  axesResults: PropTypes.objectOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    finalScore: PropTypes.number.isRequired,
    classification: PropTypes.string.isRequired
  })).isRequired
};

export default AxisChart;
