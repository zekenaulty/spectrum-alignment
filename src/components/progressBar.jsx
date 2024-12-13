import PropTypes from 'prop-types';

const ProgressBar = ({ current, total }) => {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="mb-3 position-relative" style={{width: '100%', height: '20px'}}>
      <div className="progress" style={{height: '100%'}}>
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${percent}%` }}
          aria-valuenow={current}
          aria-valuemin={1}
          aria-valuemax={total}
        />
      </div>
      <span 
        className="position-absolute text-center w-100" 
        style={{ top: '0', left: '0', lineHeight: '20px' }}
      >
        {current}/{total}
      </span>
    </div>
  );
};

ProgressBar.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default ProgressBar;
