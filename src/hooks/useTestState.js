import { useState, useMemo } from 'react';

export default function useTestState(questions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState({});

  const totalQuestions = questions.length;

  const setResponse = (id, value) => {
    setResponses(prev => ({ ...prev, [id]: value }));
  };

  const nextQuestion = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const isLastQuestion = useMemo(() => currentIndex === totalQuestions - 1, [currentIndex, totalQuestions]);

  return {
    currentIndex,
    responses,
    setResponse,
    nextQuestion,
    prevQuestion,
    isLastQuestion
  };
}
