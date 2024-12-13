import PropTypes from 'prop-types';

Question.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    weights: PropTypes.object.isRequired, // { [axisName]: number }
    category: PropTypes.string.isRequired
  }).isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onChange: PropTypes.func.isRequired
};

const Question = ({ question, value, onChange }) => {
  return (
    <div className="mb-3">
      <p>{question.text}</p>
      <div className="d-flex justify-content-between">
        {[1, 2, 3, 4, 5].map(option => (
          <div key={option} className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name={`question-${question.id}`}
              id={`question-${question.id}-opt-${option}`}
              value={option}
              checked={parseInt(value) === option}
              onChange={(e) => onChange(question.id, parseInt(e.target.value))}
            />
            <label className="form-check-label" htmlFor={`question-${question.id}-opt-${option}`}>
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
