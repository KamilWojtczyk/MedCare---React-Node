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
              <LinkContainer to="/users">
                <Nav.Link>ALL PATIENTS</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/user/new">
                <Nav.Link>ADD PATIENT</Nav.Link>
              </LinkContainer>
            </Nav>
            <Form inline>
              <LinkContainer to="/auth">
                <Nav.Link>
                  <Button variant="outline-success">LOGIN IN</Button>
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
