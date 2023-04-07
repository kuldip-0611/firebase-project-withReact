import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";


const Header = () => {
  return (
    <div>
      <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home" >Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href='/'>Home</Nav.Link>
              
              <Nav.Link href="/book/list" className='text-secondary'>Add Listing</Nav.Link>
              <Nav.Link href='/book/orders'>Orders</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
    </div>
  );
};

export default Header;
