import PropTypes from 'prop-types';

const Result = ({ interpretation }) => {
  if (!interpretation) return null;
  const { result, description } = interpretation;
  return (
    <div className="mt-4">
      <h3>Your Alignment: {result}</h3>
      <p>{description}</p>
    </div>
  );
};

Result.propTypes = {
  interpretation: PropTypes.shape({
    result: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })
};

export default Result;
