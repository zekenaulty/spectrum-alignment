import Question from './question.jsx';
import PropTypes from 'prop-types';

const CategorySection = ({ category, questions, responses, onChange }) => {
  return (
    <div className="mb-4">
      <h3>{category.name}</h3>
      {questions.map(q => (
        <Question key={q.id} question={q} value={responses[q.id]} onChange={onChange} />
      ))}
    </div>
  );
};

CategorySection.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    file: PropTypes.string.isRequired
  }).isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    weights: PropTypes.object.isRequired,
    category: PropTypes.string.isRequired
  })).isRequired,
  responses: PropTypes.objectOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired
};

export default CategorySection;
