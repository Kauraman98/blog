import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {auth as authInstance} from '../services/firebase-config';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user-context';
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';

import { hover } from '@testing-library/user-event/dist/hover';
import { FaSearch } from 'react-icons/fa';








function NavBar() {

  const user = useContext(UserContext);
  
  const navigate = useNavigate();

  let [searchParams, setSearchParams] = useSearchParams();
  const [search, SetSearch]=useState("");


  useEffect(() => {

    if(searchParams.get('search')) {
      SetSearch(searchParams.get('search'));
    }
  }, [searchParams])


  const handleSignOut = () => {
    authInstance.signOut().then(() => {
      navigate('/');
    });

  
  };

  

 const handleSearchInputChange = (event) => {

    const value = event.target.value;
      if(event.key === 'Enter') { 
      navigate(`/?search=${value}`);
    }
 }

 const handleSearch = (event) => {
    const value = event.target.value;
    SetSearch(value);
    if(!value) { 
      navigate(`/`);
    
    }
 }


  return (
    <Navbar expand="lg" className="" bg="dark" data-bs-theme="dark" >
      <Container style={{}} fluid className='justify-content-space-between'>
        

        <Navbar.Brand href="#home"  style={{ textAlign: "center",  }}>
          <Link to="/" style={{ textDecoration:"transparent"}}>
          <img
  src="blog.png"
  className="  hover:ease-in-out hover:border-teal-950 rounded-full   h-8 w-15  cursor-pointer   "
/>

      </Link>
      
        </Navbar.Brand>
        <Navbar.Brand href="#home" style={{ textAlign: "center",  }}>
          <Link to="/" style={{ textDecoration:"transparent"}}>
      

      </Link>
      <div style={{ position: "relative", display: "inline-block", marginLeft: "15px" }}>
        
        <input 
        onChange={handleSearch}

         type="search"
         placeholder="search your blog"
         value={search}
         onKeyUp={handleSearchInputChange} 
         style={{
           position: 'relative',
           color:"black",
           padding: "5px 30px 5px 40px", // Add padding for the icon
           borderRadius: "5px",
           border: "1px solid #ccc",
           backgroundColor: "#f0f0f0",
           width: "100%",
         }}
       />   
       <FaSearch  button type="submit " style={{ 
         
        
         position: "absolute",
         left: "2px",
         top: "50%",
         margin:"inherit",
         transform: "translateY(-50%)",
         color: "#ccc"
       }} />
      
     </div>
      
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end -webkit-tap-highlight-color: transparent;">
          {user && <Nav.Link><Link  className='mr-2 font-weight-400 text-decoration-none  text-slate-50 hover:bg-slate-50 hover:text-black p-2 rounded  ' to="/create-blog">Write</Link></Nav.Link>}

          <Nav >
         
        {user && 
              <NavDropdown title="Profile" id="basic-nav-dropdown"  >
              <NavDropdown.Item href="#action/3.1">{user.email}</NavDropdown.Item>
              <NavDropdown.Item>
               <Link to="/profile"style={{ textDecoration: 'none',color:"white"}}>My Profile</Link>
              </NavDropdown.Item> 
              <NavDropdown.Item>
               <Link to="/create-blog"style={{ textDecorationLine:"none" ,color:"white", }}>Write</Link>
              </NavDropdown.Item> 
              <NavDropdown.Item>
                  <Link to="/my-blogs"style={{ textDecoration: 'none', color:'white', }}>My Blogs</Link>
              </NavDropdown.Item> 
              <NavDropdown.Item onClick={handleSignOut}>Sign Out</NavDropdown.Item>
              <NavDropdown.Divider />

            </NavDropdown>}   
    

      
            {!user && <Nav.Link  ><Link to="/SignIn">SignIn</Link></Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
