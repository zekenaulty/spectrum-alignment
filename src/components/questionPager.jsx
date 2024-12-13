import PropTypes from 'prop-types';

const QuestionPager = ({ onNext, onBack, canGoBack, nextLabel = "Next" }) => {
  return (
    <div className="d-flex justify-content-between mt-3">
      <button className="btn btn-secondary" onClick={onBack} disabled={!canGoBack}>Back</button>
      <button className="btn btn-primary" onClick={onNext}>{nextLabel}</button>
    </div>
  );
};

QuestionPager.propTypes = {
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  canGoBack: PropTypes.bool.isRequired,
  nextLabel: PropTypes.string.isRequired
};

export default QuestionPager;
