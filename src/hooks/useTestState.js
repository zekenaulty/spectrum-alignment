// src/hooks/useTestState.js
import { useState, useEffect } from 'react';

export default function useTestState(questions, testId) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    // Attempt to load saved state from localStorage if available
    const savedResponses = localStorage.getItem(`${testId}_responses`);
    const savedIndex = localStorage.getItem(`${testId}_currentIndex`);

    if (savedResponses) {
      try {
        const parsed = JSON.parse(savedResponses);
        setResponses(parsed);
      } catch (e) {
        console.warn('Failed to parse saved responses:', e);
      }
    }

    if (savedIndex && !isNaN(parseInt(savedIndex, 10))) {
      setCurrentIndex(parseInt(savedIndex, 10));
    }
  }, [testId]);

  const totalQuestions = questions.length;

  const setResponse = (id, value) => {
    setResponses(prev => {
      const updated = { ...prev, [id]: value };
      // Save to localStorage whenever responses update
      localStorage.setItem(`${testId}_responses`, JSON.stringify(updated));
      return updated;
    });
  };

  const nextQuestion = () => {
    setCurrentIndex((prev) => {
      const newIndex = Math.min(prev + 1, totalQuestions - 1);
      localStorage.setItem(`${testId}_currentIndex`, newIndex);
      return newIndex;
    });
  };

  const prevQuestion = () => {
    setCurrentIndex((prev) => {
      const newIndex = Math.max(prev - 1, 0);
      localStorage.setItem(`${testId}_currentIndex`, newIndex);
      return newIndex;
    });
  };

  const isLastQuestion = currentIndex === totalQuestions - 1;

  return {
    currentIndex,
    responses,
    setResponse,
    nextQuestion,
    prevQuestion,
    isLastQuestion
  };
}
