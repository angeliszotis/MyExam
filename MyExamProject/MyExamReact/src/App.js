import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Exam from './components/Exam';
import Layout from './components/Layout';
import Authenticate from './components/Authenticate';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<Authenticate />}>
            <Route path="/exam" element={<Exam />} />
            <Route path="/exam" element={<Exam />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
