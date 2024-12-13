// src/pages/finalResults.jsx
import { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import useConfig from '../hooks/useConfig.js';
import useQuestions from '../hooks/useQuestions.js';
import { calculateScores } from '../utils/scoreCalculator.js';
import Result from '../components/result.jsx';
import AxisSummary from '../components/axisSummary.jsx';
import AxisChart from '../components/axisChart.jsx';

const FinalResults = () => {
  const { state } = useLocation();
  const { testId } = useParams();
  const navigate = useNavigate();
  const { config, loading: configLoading, error: configError } = useConfig(testId);
  const { questions, loading: qLoading, error: qError } = useQuestions(testId);
  const [finalResult, setFinalResult] = useState(null);

  useEffect(() => {
    if (!state || !state.responses) {
      navigate(`/test/${testId}`);
      return;
    }
    if (!configLoading && !qLoading && config && questions.length) {
      const result = calculateScores(config, questions, state.responses);
      setFinalResult(result);

      // Clear localStorage since the test is complete
      localStorage.removeItem(`${testId}_responses`);
      localStorage.removeItem(`${testId}_currentIndex`);
    }
  }, [state, config, questions, configLoading, qLoading, navigate, testId]);

  if (configLoading || qLoading) return <div className="container">Calculating results...</div>;
  if (configError || qError) return <div className="container">Error: {configError || qError}</div>;

  if (!finalResult) return <div className="container">No results yet.</div>;

  const { axesResults, interpretation } = finalResult;

  return (
    <div className="container">
      <h2>Final Results</h2>
      <AxisChart axesResults={axesResults} />
      <AxisSummary axesResults={axesResults} />
      <Result interpretation={interpretation} />
      <button className="btn btn-primary mt-4" onClick={() => navigate('/')}>Return Home</button>
    </div>
  );
};

export default FinalResults;
