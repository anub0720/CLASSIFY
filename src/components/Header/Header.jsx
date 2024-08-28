import { useState } from 'react';
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
import join from '../../assets/join.svg';
import PropTypes from 'prop-types';
import logout from '../../assets/logout.svg';

const Header = ({ showAddClassIcon, showJoinIcon }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  const handleSignOut = async () => {
    await doSignOut();
    navigate('/login');
  };

  return (
    <div>
      {/* Sidebar */}
      <div className={`dropdown-side-window ${isSidebarOpen ? 'open' : ''}`}>
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
          {userLoggedIn && (
            <NavDropdown.Item className="logout" onClick={handleSignOut}>
              <img src={logout} alt="LogOut icon" className="side-logo" />
              <span className="text">Logout</span>
            </NavDropdown.Item>
          )}
        </div>
      </div>

      {/* Navbar */}
      <Navbar collapseOnSelect expand="lg" className="bg-primary" data-bs-theme="dark" fixed="top">
        <Container className="d-flex align-items-center justify-content-between">
          <Nav.Link onClick={toggleSidebar} className="explore" data-bs-theme="dark">
            EXPLORE
          </Nav.Link>
          <Navbar.Brand href="/home" className="d-flex align-items-center">
            <img src={logo} alt="Website Logo" className="logo me-2" />
            <span className="navbar-brand">CLASSIFY</span>
          </Navbar.Brand>
          <div className="d-flex align-items-center">
            {userLoggedIn && (
              <>
                {showAddClassIcon && (
                  <Nav.Link href="/add" className="plus d-flex align-items-center">
                    <span style={{color:"white"}}>Add Class</span>
                    <img src={add} alt="Add icon" className="icon-logo d-flex align-items-center" />
                  </Nav.Link>
                )}
                {showJoinIcon && (
                  <Nav.Link href="/join" className="join ml-auto d-flex align-items-center">
                     <span style={{color:"white"}}>Join Class</span>
                    <img src={join} alt="Join icon" className="icon-logo d-flex align-items-center" style={{color:"white"}}/>
                  </Nav.Link>
                )}
              </>
            )}
          
          </div>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto d-flex align-items-center">
              {/* Additional nav items can be added here if needed */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

Header.propTypes = {
  showAddClassIcon: PropTypes.bool,
  showJoinIcon: PropTypes.bool,
};

export default Header;
