import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Exam from './components/Exam';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/exam" element={<Exam />} />
        {/* <Route path="/result" element={<Result />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
