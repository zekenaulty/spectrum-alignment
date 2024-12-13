import  { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useConfig from '../hooks/useConfig.js';

const TestLoader = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const { config, loading, error } = useConfig(testId);

  useEffect(() => {
    if (!loading && config && !error) {
      // Once config is loaded, go to wizard
      navigate(`/test/${testId}/wizard`);
    }
  }, [loading, config, error, navigate, testId]);

  if (loading) {
    return <div className="container">Loading test configuration...</div>;
  }

  if (error) {
    return <div className="container">Error loading test: {error}</div>;
  }

  return <div className="container">Initializing...</div>;
};

export default TestLoader;
