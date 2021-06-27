import React, { useState } from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, Item } from 'react-router-dom';

const Header = () => {
const [publicURL, setPublicURL] = useState("/task");
    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
            
                <Link to={`${publicURL}`}>
                    <Navbar.Brand>Blog Post</Navbar.Brand>
                </Link>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    
                    <Link to={`${publicURL}/login`}>
                        <Nav.Item className="text-white mr-2" href={`${publicURL}`}>Login</Nav.Item>
                    </Link>
                    
                    <Link to={`${publicURL}/posts`}>
                        <Nav.Item className="text-white mr-2" href={`${publicURL}/posts`}>Posts</Nav.Item>
                    </Link>

                    <Link to={`${publicURL}/profile`}>
                        <Nav.Item className="text-white mr-2" href={`${publicURL}/profile`}>Profile</Nav.Item>
                    </Link>
        
                    
                </Nav>
                
            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
 
export default Header;