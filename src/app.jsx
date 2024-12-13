import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TestSelection from './pages/testSelection.jsx';
import TestLoader from './pages/testLoader.jsx';
import QuestionWizard from './pages/questionWizard.jsx';
import FinalResults from './pages/finalResults.jsx';
import NotFound from './pages/notFound.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TestSelection />} />
        <Route path="/test/:testId" element={<TestLoader />}>
          {/* TestLoader will redirect to wizard or handle loading */}
        </Route>
        <Route path="/test/:testId/wizard" element={<QuestionWizard />} />
        <Route path="/test/:testId/results" element={<FinalResults />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
