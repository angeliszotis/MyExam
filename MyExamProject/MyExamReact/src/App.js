import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Exams from './components/Exams';
import Layout from './components/Layout';
import Quiz from './components/Quiz';
import Authenticate from './components/Authenticate';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Authenticate />}>
          <Route path="/" element={<Layout />}>
            <Route path="/exams" element={<Exams />} />
            <Route path="/quiz" element={<Quiz />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
