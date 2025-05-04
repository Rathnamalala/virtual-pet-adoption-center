
import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Alert, Spinner, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { petApi } from '../../services/api';
import { toast } from 'react-toastify';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
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
      setLoading(true);
      const response = await petApi.getAllPets();
      const availablePets = response.data.filter(pet => !pet.adopted);
      setPets(availablePets);
      
      if (availablePets.length === 0) {
        toast.info('No pets available for matching at the moment.');
      }
    } catch (error) {
      toast.error('Failed to fetch pets');
      console.error('Failed to fetch pets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (value) => {
    const newAnswers = {
      ...answers,
      [currentQuestion]: value
    };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers) => {
    // Personality mapping based on answers
    const personalityMap = {
      'high-large-very': ['Energetic', 'Playful', 'Friendly'],
      'high-medium-very': ['Friendly', 'Energetic', 'Playful'],
      'high-small-very': ['Playful', 'Friendly', 'Energetic'],
      'high-large-moderate': ['Energetic', 'Friendly'],
      'high-medium-moderate': ['Friendly', 'Playful'],
      'high-small-moderate': ['Playful', 'Friendly'],
      'high-large-quiet': ['Energetic', 'Calm'],
      'high-medium-quiet': ['Friendly', 'Calm'],
      'high-small-quiet': ['Calm', 'Friendly'],
      
      'medium-large-very': ['Friendly', 'Playful'],
      'medium-medium-very': ['Friendly', 'Playful'],
      'medium-small-very': ['Friendly', 'Calm'],
      'medium-large-moderate': ['Friendly', 'Calm'],
      'medium-medium-moderate': ['Friendly', 'Calm'],
      'medium-small-moderate': ['Calm', 'Friendly'],
      'medium-large-quiet': ['Calm', 'Shy'],
      'medium-medium-quiet': ['Calm', 'Shy'],
      'medium-small-quiet': ['Shy', 'Calm'],
      
      'low-large-very': ['Calm', 'Friendly'],
      'low-medium-very': ['Calm', 'Friendly'],
      'low-small-very': ['Calm', 'Shy'],
      'low-large-moderate': ['Calm', 'Shy'],
      'low-medium-moderate': ['Shy', 'Calm'],
      'low-small-moderate': ['Shy', 'Calm'],
      'low-large-quiet': ['Shy', 'Calm'],
      'low-medium-quiet': ['Shy', 'Calm'],
      'low-small-quiet': ['Shy', 'Calm']
    };

    const key = `${finalAnswers[0]}-${finalAnswers[1]}-${finalAnswers[2]}`;
    const matchedPersonalities = personalityMap[key] || ['Friendly', 'Calm'];

    // Find pets that match the personalities
    const matchedPets = pets.filter(pet => 
      matchedPersonalities.includes(pet.personality)
    );

    // If no exact matches, find pets with at least one matching trait
    if (matchedPets.length === 0) {
      const partialMatches = pets.filter(pet => 
        matchedPersonalities.some(personality => 
          pet.personality === personality
        )
      );
      setResult(partialMatches);
    } else {
      setResult(matchedPets);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (result !== null) {
    return (
      <Container className="quiz-container py-5">
        <h2 className="text-center mb-4">Your Perfect Matches!</h2>
        
        {result.length > 0 ? (
          <>
            <Alert variant="success" className="text-center">
              We found {result.length} pet(s) that match your personality!
            </Alert>
            
            <div className="row">
              {result.map(pet => (
                <div key={pet._id} className="col-md-6 mb-4">
                  <Card className="h-100 shadow-sm">
                    <Card.Body>
                      <Card.Title className="d-flex justify-content-between align-items-center">
                        <span>{pet.name}</span>
                        <span className={`badge bg-${pet.mood === 'Happy' ? 'success' : pet.mood === 'Excited' ? 'warning' : 'danger'}`}>
                          {pet.mood}
                        </span>
                      </Card.Title>
                      <Card.Text>
                        <strong>Species:</strong> {pet.species}<br />
                        <strong>Age:</strong> {pet.age} years<br />
                        <strong>Personality:</strong> {pet.personality}<br />
                        <strong>Match Reason:</strong> Your answers suggest you'd be a great match for a {pet.personality.toLowerCase()} pet!
                      </Card.Text>
                      <Button 
                        variant="primary" 
                        onClick={() => navigate('/')}
                        className="w-100"
                      >
                        View on Homepage
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </>
        ) : (
          <Alert variant="info" className="text-center">
            No exact matches found, but all our pets need loving homes!
          </Alert>
        )}
        
        <div className="text-center mt-4">
          <Button variant="secondary" onClick={resetQuiz} className="me-2">
            <i className="fas fa-redo me-2"></i>
            Take Quiz Again
          </Button>
          <Button variant="primary" onClick={() => navigate('/')}>
            <i className="fas fa-home me-2"></i>
            Browse All Pets
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="quiz-container py-5">
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h3 className="mb-0">Find Your Perfect Pet Match</h3>
          <ProgressBar 
            now={progress} 
            label={`${Math.round(progress)}%`}
            className="mt-3"
            variant="light"
          />
        </Card.Header>
        <Card.Body>
          <h5 className="mb-4">
            Question {currentQuestion + 1} of {questions.length}
          </h5>
          <h4 className="mb-4">{questions[currentQuestion].question}</h4>
          <div className="d-grid gap-3">
            {questions[currentQuestion].options.map(option => (
              <Button
                key={option.value}
                variant="outline-primary"
                size="lg"
                onClick={() => handleAnswer(option.value)}
                className="text-start"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </Card.Body>
        {currentQuestion > 0 && (
          <Card.Footer>
            <Button 
              variant="link" 
              onClick={() => setCurrentQuestion(prev => prev - 1)}
              className="text-muted"
            >
              <i className="fas fa-arrow-left me-2"></i>
              Previous Question
            </Button>
          </Card.Footer>
        )}
      </Card>
    </Container>
  );
};

export default Quiz;