import { useNavigate } from 'react-router-dom';

const TestSelection = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/test/alignment-test');
  };

  return (
    <div className="container">
      <h1>Welcome to the Spectrum Alignment Tests</h1>
      <p>Select a test to begin:</p>
      <button className="btn btn-primary" onClick={handleClick}>
        D&D Alignment Test
      </button>
    </div>
  );
};

export default TestSelection;
