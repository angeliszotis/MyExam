import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Exams from './components/Exams';
import Layout from './components/Layout';
import Quiz from './components/Quiz';
import Authenticate from './components/Authenticate';
import Result from './components/Result';
import Register from './components/Register';
import CreateExam from './components/CreateExam';
import Profile from './components/Profile';
import MyGrades from './components/MyGrades';
import MyCreatedExams from './components/MyCreatedExams';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authenticate />}>
          <Route path="/" element={<Layout />}>
            <Route path="/exams" element={<Exams />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
            <Route path="/createexam" element={<CreateExam />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/mygrades" element={<MyGrades />} />
            <Route path="/mycreatedexams" element={<MyCreatedExams />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
