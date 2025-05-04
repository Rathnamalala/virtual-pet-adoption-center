
import React from 'react';
import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import PetCard from '../PetCard/PetCard';

const PetList = ({ pets, loading, onAdopt, onDelete }) => {
  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (pets.length === 0) {
    return (
      <Alert variant="info" className="text-center">
        <i className="fas fa-info-circle me-2"></i>
        No pets available at the moment. Please check back later!
      </Alert>
    );
  }

  return (
    <Row>
      {pets.map((pet) => (
        <Col key={pet._id} md={4} lg={3} className="mb-4">
          <PetCard 
            pet={pet} 
            onAdopt={onAdopt} 
            onDelete={onDelete} 
          />
        </Col>
      ))}
    </Row>
  );
};

export default PetList;