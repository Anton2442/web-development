import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail'


function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Главная</Link>
      </nav>
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>
    </Router>

  );
}

export default App;
