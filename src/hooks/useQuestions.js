import { useState, useEffect } from 'react';
import { loadCategories, loadQuestionsFile } from '../utils/configLoader.js';
import useConfig from './useConfig.js';

export default function useQuestions(testId) {
  const { config, loading: configLoading, error: configError } = useConfig(testId);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (configLoading || !config) return;
    if (configError) {
      setError(configError);
      setLoading(false);
      return;
    }

    async function fetchAllQuestions() {
      try {
        setLoading(true);
        const categories = await loadCategories(testId);
        let allQuestions = [];
        for (const cat of categories) {
          const qData = await loadQuestionsFile(testId, cat.file);
          // Convert moralityWeight, orderWeight to a weights map {morality: x, order: y}
          // Based on previous instructions that we have nested weights now:
          // If you've already changed your JSON to nested weights, skip this step.
          // Here we assume original format and we transform them:
          const qTransformed = qData.map(q => ({
            ...q,
            weights: {
              morality: q.moralityWeight || 0,
              order: q.orderWeight || 0
            }
          }));
          allQuestions = allQuestions.concat(qTransformed);
        }
        setQuestions(allQuestions);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAllQuestions();
  }, [config, configLoading, configError, testId]);

  return { questions, loading, error };
}
