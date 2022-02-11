import React from "react";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import View from "./View";
//import Post from "./Post";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

export default function NavBar() {
  return (
    <div>
      <Container>
        <Navbar bg="light" variant="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src="https://learning.thedeveloperacademy.com/pluginfile.php/1/theme_moove/logo/1624462331/TheDevAcademy%20Logo%20NB.png"
                width="50"
                height="30"
                className="d-inline-block align-top"
              />{" "}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
              <Nav.Link href="#">Tempture</Nav.Link>
              <Nav.Link href="#">Wind Speed</Nav.Link>
              <Nav.Link href="#"></Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    </div>
  );
}