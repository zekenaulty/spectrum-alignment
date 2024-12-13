import { useNavigate } from 'react-router-dom';

const TestSelection = () => {
  const navigate = useNavigate();

  // For now, we have only one test: dnd_alignment_test
  const handleClick = () => {
    navigate('/test/dnd_alignment_test');
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
