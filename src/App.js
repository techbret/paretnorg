import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/Navbar';
import AuthContextProvider from './context/AuthContext';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import UserInfo from './components/SetUp/UserInfo';
import StudentInfo from './components/SetUp/StudentInfo';
import Info from './components/SetUp/Info';
import Finish from './components/SetUp/FinishUp';
import Dashboard from './components/Client/Dashboard';
import NonUserRoutes from './config/NonUserRoutes';
import Parents from './components/Parents';
import Research from './components/Research';
import StudentLogin from './components/Student/StudentLogin';
import OurMethod from './components/OurMethod';
import Resources from './components/Resources';
import StudentDashboard from './components/Student/StudentDashboard';
import CreateStudentAccount from './components/Student/CreateStudentAccount';
import StudentLesson from './components/Student/StudentLesson';
import StudentQuiz from './components/Student/StudentQuiz';
import StudentRecord from './components/Student/StudentRecord';
import Upload from './components/Upload';
import Quiz from './components/Student/Quiz';
import QuizCreation from './components/Admin/QuizCreation';
import AdminLogin from './components/Admin/AdminLogin';
import SubmitLessons from './components/Admin/SubmitLessons';
function App() {
  return (
    <div>
      <AuthContextProvider>
        <NonUserRoutes>
        </NonUserRoutes>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/create-account/:id" element={<UserInfo />} />
          <Route path='/student-info' element={<StudentInfo />} />
          <Route path='/more-info' element={<Info />} />
          <Route path='/finish-up' element={<Finish />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/parents' element={<Parents />} />
          <Route path='/research' element={<Research />} />
          <Route path='/student-login' element={<StudentLogin />} />
          <Route path='/our-method' element={<OurMethod />} />
          <Route path='/resources' element={<Resources />} />
          <Route path='/create-student-account/:id' element={<CreateStudentAccount />} />
          <Route path='/student-dashboard' element={<StudentDashboard />} />
          <Route path='/student-lesson/:doc/:grade/:day/:lesson' element={<StudentLesson />} />
          <Route path='/student-quiz/:doc/:grade/:day/:lesson' element={<StudentQuiz />} />
          <Route path='/student-record' element={<StudentRecord />} />
          <Route path='/upload' element={<Upload />} />
          <Route path='/admin' element={<AdminLogin />} />

          <Route path='/quiz' element={<Quiz />} />
          <Route path='/admin-quiz-maker' element={<QuizCreation />} />
          <Route path='/submit' element={<SubmitLessons />} />
          
          
        </Routes>
      </AuthContextProvider>


    </div>
  );
}

export default App;
