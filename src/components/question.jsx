import PropTypes from 'prop-types';


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

Question.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Question;
