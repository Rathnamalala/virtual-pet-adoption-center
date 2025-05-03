// utils/moodLogic.js - Utility functions (e.g., mood logic)
const calculateMood = (createdAt) => {
  const now = new Date();
  const created = new Date(createdAt);
  const daysSinceCreation = Math.floor((now - created) / (1000 * 60 * 60 * 24));
  
  if (daysSinceCreation < 1) return 'Happy';
  if (daysSinceCreation <= 3) return 'Excited';
  return 'Sad';
};

module.exports = { calculateMood };