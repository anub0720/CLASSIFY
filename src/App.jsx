
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/pages/Home';
import Teacher from './components/pages/Teacher';
import Student from './components/pages/Student';
import ChatPage from './components/AI/Chatpage';
import About from './components/pages/About';
import Add from './components/pages/Add';
import Login from './components/auth/login';
import Register from './components/auth/register';
import { AuthProvider } from './contexts/authContext/index';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/protectedRoute';
import './App.css';
function App() {
  return (
    <Router>
      <AuthProvider>
        <ErrorBoundary>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<ProtectedRoute element={Home} />} />
            <Route path="/teacher" element={<ProtectedRoute element={Teacher} />} />
            <Route path="/student" element={<ProtectedRoute element={Student} />} />
            <Route path="/chatpage" element={<ProtectedRoute element={ChatPage} />} />
            <Route path="/about" element={<ProtectedRoute element={About} />} />
            <Route path="/add" element={<ProtectedRoute element={Add} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </ErrorBoundary>
      </AuthProvider>
    </Router>
  );
}

export default App;
