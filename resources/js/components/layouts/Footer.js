import React from 'react';
import { MDBContainer, MDBFooter, MDBRow, MDBCol } from 'mdbreact';
import { Container, Navbar, Link } from 'react-bootstrap';

const Footer = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="bottom">
            <Container className="text-white mr-2">
                
                <p>&copy; 2021 - Copy rights</p>
            </Container>
        </Navbar>
    );
}
 
export default Footer;