import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Header.css';
import logo from '../../assets/logo.svg';
import home from '../../assets/home.svg';
import teacher from '../../assets/teacher.svg';
import student from '../../assets/student.svg';
import AI from '../../assets/AI.svg';
import info from '../../assets/about.svg';
import add from '../../assets/add.svg';

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleSignOut = async () => {
    await doSignOut();
    navigate('/login');
  };

  return (
    <div>
      {/* Side Window for Dropdown */}
      <div className={`dropdown-side-window ${isDropdownOpen ? 'open' : ''}`}>
        <div className="dropdown-content">
          <NavDropdown.Item href="/home">
            <img src={home} alt="Home icon" className="side-logo" />
            <span className="text">Home</span>
          </NavDropdown.Item>
          <NavDropdown.Item href="/teacher">
            <img src={teacher} alt="Teacher icon" className="side-logo" />
            <span className="text">Teaching</span>
          </NavDropdown.Item>
          <NavDropdown.Item href="/student">
            <img src={student} alt="Student icon" className="side-logo" />
            <span className="text">Learning</span>
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="/chatpage">
            <img src={AI} alt="AI icon" className="side-logo" />
            <span className="text">Talk with AI</span>
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="/about">
            <img src={info} alt="Info icon" className="side-logo" />
            <span className="text">About Us</span>
          </NavDropdown.Item>
          <NavDropdown.Divider />
        </div>
      </div>

      {/* Navbar */}
      <Navbar collapseOnSelect expand="lg" className="bg-primary" data-bs-theme="dark" fixed="top">
        <Nav.Link onClick={toggleDropdown} className="explore" data-bs-theme="dark">
          EXPLORE
        </Nav.Link>
        <Container>
          <Navbar.Brand href="/home">
            <img src={logo} alt="Website Logo" className="logo" />
            <span className="navbar-brand">CLASSIFY</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav className="ml-auto">
              {userLoggedIn ? (
                <>
                  <Nav.Link href="/add" className="plus">
                    <img src={add} alt="Add icon" className="icon-logo" />
                  </Nav.Link>
                  <Nav.Link eventKey={2} className="icon" onClick={handleSignOut}>
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="/login" className="icon">
                    Login
                  </Nav.Link>
                  <Nav.Link href="/register" className="icon">
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
