import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header/Header';
import Home from './pages/Home';
import Teacher from './pages/Teacher';
import Student from './pages/Student';
import ChatPage from '../src/pages/Chatpage';
import About from './pages/About';
import Add from './pages/Add';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/student" element={<Student />} />
        <Route path="/chatpage" element={<ChatPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </Router>
  );
}

export default App;
