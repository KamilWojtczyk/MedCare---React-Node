import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Form, Button, Container } from "react-bootstrap";

function Header() {
  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Medcare</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/patients">
                <Nav.Link>ALL PATIENTS</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/patient/new">
                <Nav.Link>ADD PATIENT</Nav.Link>
              </LinkContainer>
            </Nav>
            <Form inline>
              <LinkContainer to="/login">
                <Nav.Link>
                  <Button variant="outline-success">SIGN IN</Button>
                </Nav.Link>
              </LinkContainer>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
