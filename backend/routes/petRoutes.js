// routes/petRoutes.js - API routes
const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

// POST /pets - Add a New Pet
router.post('/', petController.createPet);

// GET /pets - View All Pets  
router.get('/', petController.getAllPets);

// GET /pets/filter?mood=<mood> - Filter Pets by Mood
router.get('/filter', petController.filterPetsByMood);

// GET /pets/:id - View a Single Pet
router.get('/:id', petController.getPetById);

// PUT /pets/:id - Update a Pet's Profile
router.put('/:id', petController.updatePet);

// PATCH /pets/:id/adopt - Adopt a Pet
router.patch('/:id/adopt', petController.adoptPet);

// DELETE /pets/:id - Delete a Pet
router.delete('/:id', petController.deletePet);

module.exports = router;