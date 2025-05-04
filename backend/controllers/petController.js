
const petService = require('../services/petService');

const petController = {
  // Add a New Pet
  async createPet(req, res) {
    try {
      const pet = await petService.createPet(req.body);
      res.status(201).json(pet);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // View All Pets
  async getAllPets(req, res) {
    try {
      const pets = await petService.getAllPets();
      res.json(pets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // View a Single Pet
  async getPetById(req, res) {
    try {
      const pet = await petService.getPetById(req.params.id);
      if (!pet) {
        return res.status(404).json({ error: 'Pet not found' });
      }
      res.json(pet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a Pet's Profile
  async updatePet(req, res) {
    try {
      const pet = await petService.updatePet(req.params.id, req.body);
      if (!pet) {
        return res.status(404).json({ error: 'Pet not found' });
      }
      res.json(pet);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Adopt a Pet
  async adoptPet(req, res) {
    try {
      const pet = await petService.adoptPet(req.params.id);
      if (!pet) {
        return res.status(404).json({ error: 'Pet not found' });
      }
      res.json({ message: 'Pet adopted successfully', pet: pet });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete a Pet
  async deletePet(req, res) {
    try {
      const pet = await petService.deletePet(req.params.id);
      if (!pet) {
        return res.status(404).json({ error: 'Pet not found' });
      }
      res.json({ message: 'Pet deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Filter Pets by Mood
  async filterPetsByMood(req, res) {
    try {
      const { mood } = req.query;
      if (!mood) {
        return res.status(400).json({ error: 'Mood parameter is required' });
      }
      const pets = await petService.filterPetsByMood(mood);
      res.json(pets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = petController;