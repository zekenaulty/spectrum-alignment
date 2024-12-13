import PropTypes from 'prop-types';

const ProgressBar = ({ current, total }) => {
  const percent = Math.round((current / total) * 100);
  return (
    <div className="mb-3">
      <div className="progress" style={{ height: '20px' }}>
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${percent}%` }}
          aria-valuenow={current}
          aria-valuemin={1}
          aria-valuemax={total}
        >
          {current}/{total}
        </div>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default ProgressBar;
