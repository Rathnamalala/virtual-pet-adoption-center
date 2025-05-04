// src/components/PetCard/PetCard.js
import React, { useState } from 'react';
import { Card, Button, Badge, Modal } from 'react-bootstrap';
import Confetti from 'react-confetti';
import AdoptionCertificate from '../AdoptionCertificate/AdoptionCertificate';
import { getMoodColor, getMoodIcon } from '../../utils/helpers';

const PetCard = ({ pet, onAdopt, onDelete }) => {
  const [showCertificate, setShowCertificate] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isAdopting, setIsAdopting] = useState(false);
  const [adoptedPet, setAdoptedPet] = useState(null);

  const handleAdopt = async () => {
    try {
      setIsAdopting(true);
      await onAdopt(pet._id);
      
      // Update the pet object with adoption info
      const adoptedPetData = {
        ...pet,
        adopted: true,
        adoption_date: new Date()
      };
      setAdoptedPet(adoptedPetData);
      
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        setShowCertificate(true);
      }, 3000);
    } catch (error) {
      console.error('Adoption error:', error);
    } finally {
      setIsAdopting(false);
    }
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

      <Card className="pet-card shadow-sm h-100">
        <Card.Body className="d-flex flex-column">
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
          
          <Card.Text className="flex-grow-1">
            <strong>Species:</strong> {pet.species}<br />
            <strong>Age:</strong> {pet.age} years<br />
            <strong>Personality:</strong> {pet.personality}
          </Card.Text>
          
          <div className="d-flex justify-content-between mt-auto">
            {!pet.adopted && (
              <Button 
                variant="success" 
                onClick={handleAdopt}
                className="me-2"
                disabled={isAdopting}
              >
                {isAdopting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Adopting...
                  </>
                ) : (
                  <>
                    <i className="fas fa-home me-2"></i>
                    Adopt Me
                  </>
                )}
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
        onHide={() => {
          setShowCertificate(false);
          setAdoptedPet(null);
        }}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Adoption Certificate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {adoptedPet && (
            <AdoptionCertificate 
              pet={adoptedPet} 
              onClose={() => {
                setShowCertificate(false);
                setAdoptedPet(null);
              }} 
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PetCard;