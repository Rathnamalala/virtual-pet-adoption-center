// src/components/Hero/Hero.js
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-section">
      <div className="hero-overlay">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={6} className="text-white">
              <h1 className="hero-title animate-fade-in">
                Find Your Perfect
                <span className="text-gradient"> Furry Friend</span>
              </h1>
              <p className="hero-subtitle animate-fade-in-delay">
                Give a loving home to pets in need. Browse through our selection of
                adorable animals waiting for their forever families.
              </p>
              <div className="hero-buttons animate-fade-in-delay-2">
                <Button 
                  variant="light" 
                  size="lg" 
                  className="me-3 hero-btn"
                  onClick={() => document.getElementById('pet-section').scrollIntoView({ behavior: 'smooth' })}
                >
                  Browse Pets
                </Button>
                <Button 
                  variant="outline-light" 
                  size="lg" 
                  className="hero-btn"
                  onClick={() => navigate('/quiz')}
                >
                  Take Quiz
                </Button>
              </div>
              <div className="hero-stats mt-5 animate-fade-in-delay-3">
                <Row>
                  <Col xs={4}>
                    <h3 className="stat-number">500+</h3>
                    <p className="stat-label">Pets Adopted</p>
                  </Col>
                  <Col xs={4}>
                    <h3 className="stat-number">98%</h3>
                    <p className="stat-label">Happy Owners</p>
                  </Col>
                  <Col xs={4}>
                    <h3 className="stat-number">24/7</h3>
                    <p className="stat-label">Support</p>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col lg={6} className="d-none d-lg-block">
              <div className="hero-image-container animate-float">
                <img 
                  src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80"
                  alt="Happy pets"
                  className="hero-image"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="hero-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,112C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;