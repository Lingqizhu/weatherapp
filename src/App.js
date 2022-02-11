import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Home from "./Home";
import LineChart from "./LineChart";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <BrowserRouter>
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
                <Nav.Link as={Link} to="/Home">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/LineChart">
                  Click here to see more details of weather in the next 48 hours
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>

      <Container className="app">
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/LineChart" element={<LineChart />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
