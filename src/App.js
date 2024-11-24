import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Resume from './pages/Resume';
import Game from './pages/Game';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resume" element={<Resume />} /> 
        <Route path="/game" element={<Game />} /> 
        <Route path="*" element={<Home />} /> 
      </Routes>
    </Router>
  );
};

export default App;