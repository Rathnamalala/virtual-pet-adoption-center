// src/components/Quiz/Quiz.js
import React, { useState, useEffect } from 'react';
import { Container, Card, Button,  Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { petApi } from '../../services/api';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  const questions = [
    {
      id: 1,
      question: "What's your activity level?",
      options: [
        { value: 'high', label: 'Very active - I love outdoor activities' },
        { value: 'medium', label: 'Moderate - I enjoy regular walks' },
        { value: 'low', label: 'Relaxed - I prefer quiet time at home' }
      ]
    },
    {
      id: 2,
      question: "How much space do you have?",
      options: [
        { value: 'large', label: 'Large house with yard' },
        { value: 'medium', label: 'Apartment with some space' },
        { value: 'small', label: 'Small apartment' }
      ]
    },
    {
      id: 3,
      question: "How social are you?",
      options: [
        { value: 'very', label: 'Very social - I love meeting new people' },
        { value: 'moderate', label: 'Moderately social' },
        { value: 'quiet', label: 'I prefer quiet environments' }
      ]
    }
  ];

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await petApi.getAllPets();
      setPets(response.data.filter(pet => !pet.adopted));
    } catch (error) {
      console.error('Failed to fetch pets:', error);
    }
  };

  const handleAnswer = (value) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: value
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    const personalityMap = {
      'high-large-very': ['Energetic', 'Playful'],
      'high-medium-very': ['Friendly', 'Energetic'],
      'high-small-very': ['Playful', 'Friendly'],
      'medium-large-moderate': ['Friendly', 'Calm'],
      'medium-medium-moderate': ['Friendly', 'Playful'],
      'medium-small-moderate': ['Calm', 'Friendly'],
      'low-large-quiet': ['Calm', 'Shy'],
      'low-medium-quiet': ['Shy', 'Calm'],
      'low-small-quiet': ['Shy', 'Calm']
    };

    const key = `${answers[0]}-${answers[1]}-${answers[2]}`;
    const matchedPersonalities = personalityMap[key] || ['Friendly'];

    const matchedPets = pets.filter(pet => 
      matchedPersonalities.includes(pet.personality)
    );

    setResult(matchedPets);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
  };

  if (result) {
    return (
      <Container className="quiz-container py-5">
        <h2 className="text-center mb-4">Your Perfect Matches!</h2>
        {result.length > 0 ? (
          <>
            <Alert variant="success">
              We found {result.length} pet(s) that match your personality!
            </Alert>
            {result.map(pet => (
              <Card key={pet._id} className="mb-3">
                <Card.Body>
                  <Card.Title>{pet.name}</Card.Title>
                  <Card.Text>
                    <strong>Species:</strong> {pet.species}<br />
                    <strong>Age:</strong> {pet.age} years<br />
                    <strong>Personality:</strong> {pet.personality}
                  </Card.Text>
                  <Button 
                    variant="primary" 
                    onClick={() => navigate('/')}
                  >
                    View All Pets
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </>
        ) : (
          <Alert variant="info">
            No exact matches found, but check out all our available pets!
          </Alert>
        )}
        <div className="text-center mt-4">
          <Button variant="secondary" onClick={resetQuiz} className="me-2">
            Take Quiz Again
          </Button>
          <Button variant="primary" onClick={() => navigate('/')}>
            Browse All Pets
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="quiz-container py-5">
      <Card>
        <Card.Header>
          <h3>Find Your Perfect Pet Match</h3>
          <div className="text-muted">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </Card.Header>
        <Card.Body>
          <h5 className="mb-4">{questions[currentQuestion].question}</h5>
          <div className="d-grid gap-2">
            {questions[currentQuestion].options.map(option => (
              <Button
                key={option.value}
                variant="outline-primary"
                size="lg"
                onClick={() => handleAnswer(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Quiz;