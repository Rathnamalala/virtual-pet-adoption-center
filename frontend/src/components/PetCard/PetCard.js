// src/components/PetCard/PetCard.js
import React, { useState } from 'react';
import { Card, Button, Badge, Modal } from 'react-bootstrap';
import Confetti from 'react-confetti';
import AdoptionCertificate from '../AdoptionCertificate/AdoptionCertificate';
import { getMoodColor, getMoodIcon } from '../../utils/helpers';

const PetCard = ({ pet, onAdopt, onDelete }) => {
  const [showCertificate, setShowCertificate] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAdopt = () => {
    onAdopt(pet._id);
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setShowCertificate(true);
    }, 3000);
  };

  return (
    <>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
      )}

      <Card className="pet-card shadow-sm">
        <Card.Body>
          {pet.adopted && (
            <div className="adopted-overlay">
              <i className="fas fa-check-circle me-2"></i>
              ADOPTED
            </div>
          )}
          
          <Card.Title className="d-flex justify-content-between align-items-center">
            <span>{pet.name}</span>
            <Badge bg={getMoodColor(pet.mood)} className="mood-badge">
              <i className={`fas ${getMoodIcon(pet.mood)} me-1`}></i>
              {pet.mood}
            </Badge>
          </Card.Title>
          
          <Card.Text>
            <strong>Species:</strong> {pet.species}<br />
            <strong>Age:</strong> {pet.age} years<br />
            <strong>Personality:</strong> {pet.personality}
          </Card.Text>
          
          <div className="d-flex justify-content-between">
            {!pet.adopted && (
              <Button 
                variant="success" 
                onClick={handleAdopt}
                className="me-2"
              >
                <i className="fas fa-home me-2"></i>
                Adopt Me
              </Button>
            )}
            <Button 
              variant="danger" 
              onClick={() => onDelete(pet._id)}
              disabled={pet.adopted}
            >
              <i className="fas fa-trash me-2"></i>
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal 
        show={showCertificate} 
        onHide={() => setShowCertificate(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Adoption Certificate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AdoptionCertificate 
            pet={pet} 
            onClose={() => setShowCertificate(false)} 
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PetCard;