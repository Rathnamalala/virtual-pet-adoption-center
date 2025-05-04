// src/components/Hero/Hero.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      alt: "Happy puppy"
    },
    {
      url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      alt: "Cute cat"
    },
    {
      url: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      alt: "Dogs playing"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      
      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + (counter.nextElementSibling.textContent.includes('%') ? '%' : '+');
        }
      };
      
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          updateCounter();
          observer.disconnect();
        }
      });
      
      observer.observe(counter);
    });
  }, []);

  return (
    <div className="hero-section">
      <div className="hero-background">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`hero-bg-image ${index === currentImageIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image.url})` }}
          />
        ))}
        <div className="hero-overlay" />
      </div>
      
      <Container className="hero-content">
        <Row className="align-items-center min-vh-100">
          <Col lg={7} className="text-white">
            <div className="hero-badge animate-fade-in">
              <i className="fas fa-heart me-2"></i>
              Save a Life Today
            </div>
            
            <h1 className="hero-title animate-slide-up">
              Find Your Perfect
              <span className="text-gradient"> Companion</span>
              <span className="hero-emoji animate-bounce">🐾</span>
            </h1>
            
            <p className="hero-subtitle animate-slide-up-delay">
              Open your heart and home to a loving pet. Every adoption saves a life 
              and brings endless joy to your family.
            </p>
            
            <div className="hero-buttons animate-slide-up-delay-2">
              <Button 
                variant="primary" 
                size="lg" 
                className="hero-btn primary-btn"
                onClick={() => document.getElementById('pet-section').scrollIntoView({ behavior: 'smooth' })}
              >
                <i className="fas fa-search me-2"></i>
                Find Your Pet
              </Button>
              <Button 
                variant="outline-light" 
                size="lg" 
                className="hero-btn secondary-btn"
                onClick={() => navigate('/quiz')}
              >
                <i className="fas fa-magic me-2"></i>
                Take Matching Quiz
              </Button>
            </div>
            
            <div className="hero-stats animate-fade-in-delay-3">
              <Row>
                <Col xs={4}>
                  <div className="stat-item">
                    <h3 className="stat-number" data-count="1500">0</h3>
                    <p className="stat-label">Happy Adoptions</p>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="stat-item">
                    <h3 className="stat-number" data-count="98">0</h3>
                    <p className="stat-label">Success Rate</p>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="stat-item">
                    <h3 className="stat-number" data-count="50">0</h3>
                    <p className="stat-label">Pets Available</p>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          
          <Col lg={5} className="d-none d-lg-block">
            <div className="hero-image-container animate-float">
              <div className="hero-image-wrapper">
                <img 
                  src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1586&q=80"
                  alt="Happy pets"
                  className="hero-image"
                />
                <div className="image-decoration"></div>
              </div>
              
              <div className="floating-card animate-float-delayed">
                <i className="fas fa-quote-left"></i>
                <p>"Adopting Max was the best decision we ever made!"</p>
                <span>- Sarah J.</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      
      <div className="hero-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#F7F7F7" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,112C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      
      <div className="scroll-indicator animate-bounce">
        <i className="fas fa-chevron-down"></i>
      </div>
    </div>
  );
};

export default Hero;