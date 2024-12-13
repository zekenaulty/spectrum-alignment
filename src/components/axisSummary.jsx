import PropTypes from 'prop-types';

AxisSummary.propTypes = {
  axesResults: PropTypes.objectOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    finalScore: PropTypes.number.isRequired,
    classification: PropTypes.string.isRequired
  })).isRequired
};

const AxisSummary = ({ axesResults }) => {
  return (
    <div className="mb-4">
      <h3>Axis Summary</h3>
      {Object.entries(axesResults).map(([axisKey, data]) => (
        <p key={axisKey}>
          <strong>{data.label}:</strong> {data.classification} ({data.finalScore.toFixed(2)})
        </p>
      ))}
    </div>
  );
};

export default AxisSummary;
