// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import PetList from '../components/PetList/PetList';
import AddPetForm from '../components/AddPetForm/AddPetForm';
import FilterBar from '../components/FilterBar/FilterBar';
import { petApi } from '../services/api';

const HomePage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMood, setSelectedMood] = useState('all');

  const fetchPets = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await petApi.getAllPets();
      setPets(response.data);
      checkForSadPets(response.data);
    } catch (error) {
      toast.error('Failed to fetch pets');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  const checkForSadPets = (petList) => {
    const sadPets = petList.filter(pet => pet.mood === 'Sad' && !pet.adopted);
    if (sadPets.length > 0) {
      toast.warning(`${sadPets.length} pet(s) are feeling sad and need adoption!`, {
        autoClose: 5000,
      });
    }
  };

  const handleAddPet = async (petData) => {
    try {
      await petApi.createPet(petData);
      toast.success('Pet added successfully!');
      setShowAddModal(false);
      fetchPets();
    } catch (error) {
      toast.error('Failed to add pet');
    }
  };

  const handleAdoptPet = async (petId) => {
    try {
      await petApi.adoptPet(petId);
      toast.success('Congratulations on your new pet! 🎉');
      fetchPets();
    } catch (error) {
      toast.error('Failed to adopt pet');
    }
  };

  const handleDeletePet = async (petId) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      try {
        await petApi.deletePet(petId);
        toast.success('Pet deleted successfully');
        fetchPets();
      } catch (error) {
        toast.error('Failed to delete pet');
      }
    }
  };

  const handleFilterChange = async (mood) => {
    setSelectedMood(mood);
    try {
      setLoading(true);
      if (mood === 'all') {
        await fetchPets();
      } else {
        const response = await petApi.filterPetsByMood(mood);
        setPets(response.data);
      }
    } catch (error) {
      toast.error('Failed to filter pets');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center mb-4">
            <i className="fas fa-heart text-danger me-2"></i>
            Find Your Perfect Companion
          </h1>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Button 
            variant="primary" 
            onClick={() => setShowAddModal(true)}
            className="mb-3"
          >
            <i className="fas fa-plus me-2"></i>
            Add New Pet
          </Button>
        </Col>
        <Col md={6}>
          <FilterBar 
            selectedMood={selectedMood} 
            onFilterChange={handleFilterChange} 
          />
        </Col>
      </Row>

      <PetList
        pets={pets}
        loading={loading}
        onAdopt={handleAdoptPet}
        onDelete={handleDeletePet}
      />

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Pet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPetForm 
            onSubmit={handleAddPet} 
            onCancel={() => setShowAddModal(false)} 
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default HomePage;