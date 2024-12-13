// src/pages/questionWizard.jsx
import { useParams, useNavigate } from 'react-router-dom';
import useTestState from '../hooks/useTestState.js';
import useQuestions from '../hooks/useQuestions.js';
import ProgressBar from '../components/progressBar.jsx';
import Question from '../components/question.jsx';
import QuestionPager from '../components/questionPager.jsx';

const QuestionWizard = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const { questions, loading, error } = useQuestions(testId);

  const {
    currentIndex,
    responses,
    setResponse,
    nextQuestion,
    prevQuestion,
    isLastQuestion
  } = useTestState(questions, testId);

  const handleNext = () => {
    if (isLastQuestion) {
      // On finishing, consider clearing localStorage or not until after results
      navigate(`/test/${testId}/results`, { state: { responses } });
    } else {
      nextQuestion();
    }
  };

  const handleBack = () => {
    prevQuestion();
  };

  if (loading) return <div className="container">Loading questions...</div>;
  if (error) return <div className="container">Error loading questions: {error}</div>;
  if (!questions.length) return <div className="container">No questions found.</div>;

  const question = questions[currentIndex];

  return (
    <div className="container">
      <h2>{question.category}</h2>
      <ProgressBar current={currentIndex + 1} total={questions.length} />
      <Question
        question={question}
        value={responses[question.id] || ''}
        onChange={setResponse}
      />
      <QuestionPager
        onNext={handleNext}
        onBack={handleBack}
        canGoBack={currentIndex > 0}
        nextLabel={isLastQuestion ? "Finish" : "Next"}
      />
    </div>
  );
};

export default QuestionWizard;
