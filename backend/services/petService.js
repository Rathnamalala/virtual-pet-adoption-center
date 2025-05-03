// services/petService.js - Service layer for business logic
const Pet = require('../models/petModel');
const { calculateMood } = require('../utils/moodLogic');

class PetService {
  async createPet(petData) {
    const pet = new Pet(petData);
    await pet.save();
    return this.addMoodToPet(pet);
  }

  async getAllPets() {
    const pets = await Pet.find();
    return pets.map(pet => this.addMoodToPet(pet));
  }

  async getPetById(id) {
    const pet = await Pet.findById(id);
    if (!pet) return null;
    return this.addMoodToPet(pet);
  }

  async updatePet(id, updateData) {
    const pet = await Pet.findByIdAndUpdate(id, updateData, { 
      new: true, 
      runValidators: true 
    });
    if (!pet) return null;
    return this.addMoodToPet(pet);
  }

  async adoptPet(id) {
    const pet = await Pet.findByIdAndUpdate(
      id, 
      { 
        adopted: true, 
        adoption_date: new Date() 
      }, 
      { new: true }
    );
    if (!pet) return null;
    return this.addMoodToPet(pet);
  }

  async deletePet(id) {
    return await Pet.findByIdAndDelete(id);
  }

  async filterPetsByMood(mood) {
    const allPets = await this.getAllPets();
    return allPets.filter(pet => pet.mood === mood);
  }

  addMoodToPet(pet) {
    const petObj = pet.toObject();
    petObj.mood = calculateMood(pet.createdAt);
    return petObj;
  }
}

module.exports = new PetService();