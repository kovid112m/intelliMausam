import React from "react";
import { withRouter } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';

function Navigation(props) {

  return (
  <Navbar expand="md" fixed="sticky">
  <Container>
  <Navbar.Brand  href={props.location.pathname !== "/" ? "/" :""} style={{color:"white"}}>
  {console.log(props)}
        <img
          alt=""
          src="/logo192.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
      intelliMausasm
      </Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link href={props.location.pathname === "/about" ? "/" : "/about"} style={ {color: `${
                  props.location.pathname === "/about" ? "white" : "grey"
                }`, font: "inherit"}}>{props.location.pathname === "/about" ? "Go Back" : "About Us"}</Nav.Link>
        </Nav>
  </Container>
</Navbar>  
  );
}

export default withRouter(Navigation);