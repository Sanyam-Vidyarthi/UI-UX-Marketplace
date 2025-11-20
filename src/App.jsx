import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import HowToUse from './pages/HowToUse.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/how-to-use" element={<HowToUse />} />
      </Routes>
    </Router>
  );
}

export default App;
