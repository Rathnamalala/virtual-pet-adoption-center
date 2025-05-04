// src/App.js
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import Quiz from './components/Quiz/Quiz';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar variant="dark" expand="lg" fixed="top" className="shadow">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <i className="fas fa-paw me-2"></i>
            Virtual Pet Adoption Center
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/quiz">Find Your Match</Nav.Link>
              <Nav.Link href="#pet-section">Browse Pets</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <HomePage />
            </>
          } />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </main>

      <Footer />

      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;