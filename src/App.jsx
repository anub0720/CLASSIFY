import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Home from './components/pages/Home/Home';
import Teacher from './components/pages/Teacher/Teacher';
import Student from './components/pages/Student/Student';
import ChatPage from './components/pages/AI/Chatpage';
import About from './components/pages/About/About';
import Add from './components/pages/Add/Add';
import Class from './components/pages/Class/class';
import StudentClass from './components/pages/Student/StudentClass/class';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Room from './components/pages/Class/LiveClass/Room/Room';
import Join from './components/pages/Join/Join';
import { AuthProvider } from './contexts/authContext/index';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/protectedRoute';
import './App.css';

function Main() {
  const [showAddClassIcon, setShowAddClassIcon] = useState(false);
  const [showJoinIcon, setShowJoinIcon] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/teacher') {
      setShowAddClassIcon(true);
      setShowJoinIcon(false);
    } else if (location.pathname.startsWith('/student')) {
      setShowAddClassIcon(false);
      setShowJoinIcon(true);
    } else {
      setShowAddClassIcon(false);
      setShowJoinIcon(false);
    }
  }, [location.pathname]);

  return (
    <>
      <Header showAddClassIcon={showAddClassIcon} showJoinIcon={showJoinIcon} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<ProtectedRoute element={Home} />} />
        <Route path="/teacher" element={<ProtectedRoute element={Teacher} />} />
        <Route path="/student" element={<ProtectedRoute element={Student} />} />
        <Route path="/chatpage" element={<ProtectedRoute element={ChatPage} />} />
        <Route path="/about" element={<ProtectedRoute element={About} />} />
        <Route path="/class/:classId" element={<ProtectedRoute element={Class} />} />
        <Route path="/add" element={<ProtectedRoute element={Add} />} />
        <Route path="studentclass/:classId" element={<ProtectedRoute element={StudentClass} />} />
        <Route path="/join" element={<ProtectedRoute element={Join} />} />
        <Route path="/room/:roomId" element={<ProtectedRoute element={Room} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ErrorBoundary>
          <Main />
        </ErrorBoundary>
      </AuthProvider>
    </Router>
  );
}

export default App;
