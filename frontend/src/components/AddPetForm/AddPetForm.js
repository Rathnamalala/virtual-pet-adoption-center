
import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const AddPetForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    age: '',
    personality: ''
  });

  const speciesOptions = ['Dog', 'Cat', 'Rabbit', 'Bird', 'Other'];
  const personalityOptions = ['Friendly', 'Shy', 'Energetic', 'Calm', 'Playful'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      age: parseInt(formData.age)
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Pet Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter pet name"
        />
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Species</Form.Label>
            <Form.Select
              name="species"
              value={formData.species}
              onChange={handleChange}
              required
            >
              <option value="">Select species</option>
              {speciesOptions.map(species => (
                <option key={species} value={species}>
                  {species}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Age (years)</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="0"
              placeholder="Enter age"
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Personality</Form.Label>
        <Form.Select
          name="personality"
          value={formData.personality}
          onChange={handleChange}
          required
        >
          <option value="">Select personality</option>
          {personalityOptions.map(personality => (
            <option key={personality} value={personality}>
              {personality}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Add Pet
        </Button>
      </div>
    </Form>
  );
};

export default AddPetForm;