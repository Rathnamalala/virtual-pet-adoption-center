
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <Container>
          <Row>
            <Col lg={4} md={6} className="mb-4 mb-lg-0">
              <div className="footer-brand">
                <h3 className="footer-logo">
                  <i className="fas fa-paw me-2"></i>
                  Pet Adoption Center
                </h3>
                <p className="footer-description">
                  Connecting loving families with pets in need. Every pet deserves a forever home.
                </p>
                <div className="footer-social">
                  <button className="social-icon" aria-label="Facebook">
                    <i className="fab fa-facebook-f"></i>
                  </button>
                  <button className="social-icon" aria-label="Twitter">
                    <i className="fab fa-twitter"></i>
                  </button>
                  <button className="social-icon" aria-label="Instagram">
                    <i className="fab fa-instagram"></i>
                  </button>
                  <button className="social-icon" aria-label="LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                  </button>
                </div>
              </div>
            </Col>
            
            <Col lg={2} md={6} className="mb-4 mb-lg-0">
              <h5 className="footer-title">Quick Links</h5>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/quiz">Find Your Match</Link></li>
                <li><a href="#pet-section">Browse Pets</a></li>
                <li><a href="#about">About Us</a></li>
              </ul>
            </Col>
            
            <Col lg={2} md={6} className="mb-4 mb-lg-0">
              <h5 className="footer-title">Support</h5>
              <ul className="footer-links">
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#contact">Contact Us</a></li>
                <li><a href="#adoption-process">Adoption Process</a></li>
                <li><a href="#volunteer">Volunteer</a></li>
              </ul>
            </Col>
            
            <Col lg={4} md={6}>
              <h5 className="footer-title">Newsletter</h5>
              <p className="footer-text">Subscribe to get updates on new pets and adoption events.</p>
              <div className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="form-control"
                />
                <button className="btn btn-primary">
                  Subscribe
                </button>
              </div>
              <div className="footer-contact mt-4">
                <p><i className="fas fa-map-marker-alt me-2"></i> 123 Pet Street, Animal City, AC 12345</p>
                <p><i className="fas fa-phone me-2"></i> (123) 456-7890</p>
                <p><i className="fas fa-envelope me-2"></i> info@petadoption.com</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      
      <div className="footer-bottom">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start">
              <p className="mb-0">&copy; 2024 Pet Adoption Center. All rights reserved.</p>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <ul className="footer-bottom-links">
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#cookies">Cookie Policy</a></li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;