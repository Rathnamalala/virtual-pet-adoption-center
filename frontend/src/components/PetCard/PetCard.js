
import React, { useState } from 'react';
import { Card, Button, Badge, Modal } from 'react-bootstrap';
import Confetti from 'react-confetti';
import AdoptionCertificate from '../AdoptionCertificate/AdoptionCertificate';
import { getMoodColor, getMoodIcon } from '../../utils/helpers';

const PetCard = ({ pet, onAdopt, onDelete }) => {
  const [showCertificate, setShowCertificate] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isAdopting, setIsAdopting] = useState(false);
  const [localPet, setLocalPet] = useState(pet);

  const handleAdopt = async () => {
    try {
      setIsAdopting(true);
      await onAdopt(pet._id);
      
      // Update local pet state
      const updatedPet = {
        ...pet,
        adopted: true,
        adoption_date: new Date().toISOString()
      };
      setLocalPet(updatedPet);
      
      // Show confetti
      setShowConfetti(true);
      
      // After 3 seconds, hide confetti and show certificate
      setTimeout(() => {
        setShowConfetti(false);
        setShowCertificate(true);
      }, 3000);
      
    } catch (error) {
      console.error('Adoption error:', error);
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
          <Card.Title className="d-flex justify-content-between align-items-center mb-3">
            <span>{localPet.name}</span>
            <div className="d-flex gap-2">
              <Badge bg={getMoodColor(localPet.mood)} className="mood-badge">
                <i className={`fas ${getMoodIcon(localPet.mood)} me-1`}></i>
                {localPet.mood}
              </Badge>
              {localPet.adopted && (
                <Badge bg="success" className="adopted-badge">
                  <i className="fas fa-home me-1"></i>
                  Adopted
                </Badge>
              )}
            </div>
          </Card.Title>
          
          <Card.Text className="flex-grow-1">
            <strong>Species:</strong> {localPet.species}<br />
            <strong>Age:</strong> {localPet.age} years<br />
            <strong>Personality:</strong> {localPet.personality}
            {localPet.adopted && localPet.adoption_date && (
              <>
                <br />
                <strong>Adopted on:</strong> {new Date(localPet.adoption_date).toLocaleDateString()}
              </>
            )}
          </Card.Text>
          
          <div className="d-flex justify-content-between mt-auto">
            {!localPet.adopted && (
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
            {localPet.adopted && (
              <Button 
                variant="primary" 
                onClick={() => setShowCertificate(true)}
                className="me-2"
              >
                <i className="fas fa-certificate me-2"></i>
                View Certificate
              </Button>
            )}
            <Button 
              variant="danger" 
              onClick={() => onDelete(localPet._id)}
              disabled={localPet.adopted}
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
        centered
      >
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>
            <i className="fas fa-certificate me-2 text-primary"></i>
            Adoption Certificate
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <AdoptionCertificate 
            pet={localPet} 
            onClose={() => setShowCertificate(false)} 
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PetCard;