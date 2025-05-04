
const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Pet name is required'],
    trim: true
  },
  species: {
    type: String,
    required: [true, 'Species is required'],
    enum: ['Dog', 'Cat', 'Rabbit', 'Bird', 'Other']
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [0, 'Age cannot be negative']
  },
  personality: {
    type: String,
    required: [true, 'Personality is required'],
    enum: ['Friendly', 'Shy', 'Energetic', 'Calm', 'Playful']
  },
  mood: {
    type: String,
    default: 'Happy'
  },
  adopted: {
    type: Boolean,
    default: false
  },
  adoption_date: {
    type: Date,
    default: null
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Pet', petSchema);