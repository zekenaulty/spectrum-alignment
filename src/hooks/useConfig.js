import { useState, useEffect } from 'react';
import { loadTestConfig } from '../utils/configLoader.js';

export default function useConfig(testId) {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchConfig() {
      try {
        setLoading(true);
        const c = await loadTestConfig(testId);
        setConfig(c);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchConfig();
  }, [testId]);

  return { config, loading, error };
}
