import React from "react";
import { withRouter } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';

function Navigation(props) {

  return (
  <Navbar expand="md" fixed="sticky">
  <Container>
  <Navbar.Brand  href={props.location.pathname !== "/" ? "/" :"/"} style={{color:"white"}}>
        <img
          alt=""
          src={process.env.PUBLIC_URL + "/logo192.png"}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
      intelliMausasm
      </Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link href={props.location.pathname === "/about" ? "/" : "#/about"} style={ {color: `${
                  props.location.pathname === "/about" ? "white" : "#d3d3d3"
                }`, font: "inherit"}}>{props.location.pathname === "/about" ? "Go Back" : "About Us"}</Nav.Link>
        </Nav>
  </Container>
</Navbar>  
  );
}

export default withRouter(Navigation);