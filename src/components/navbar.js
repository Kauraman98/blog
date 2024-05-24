import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import {auth as authInstance} from '../services/firebase-config';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user-context';
function NavBar() {

  const user = useContext(UserContext);
  
  const navigate = useNavigate();


  const handleSignOut = () => {
    authInstance.signOut().then(() => {
      navigate('/');
    });

  
  };
  return (
    <Navbar expand="lg" className="" bg="dark" data-bs-theme="dark">
      <Container style={{}} fluid className='justify-content-space-between'>
        

        <Navbar.Brand href="#home" style={{ textAlign: "center" }}>
          <Link to="/">
      <h3 className="text-xl text-black">V <span className="text-orange-400">Blog</span></h3>
      
      </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav >
         
        {user && 
            <NavDropdown title="Profile" id="basic-nav-dropdown" >
              <NavDropdown.Item href="#action/3.1">{user.email}</NavDropdown.Item>
              <NavDropdown.Item>
               <Link to="/profile">My Profile</Link>
              </NavDropdown.Item> 
              <NavDropdown.Item>
               <Link to="/create-blog">Write</Link>
              </NavDropdown.Item> 
              <NavDropdown.Item>
                  <Link to="/my-blogs">My Blogs</Link>
              </NavDropdown.Item> 
              <NavDropdown.Item onClick={handleSignOut}>Sign Out</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>}   
    

      
            {!user && <Nav.Link  ><Link to="/SignIn">SignIn</Link></Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
