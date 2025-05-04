// src/utils/helpers.js
export const getMoodColor = (mood) => {
  switch (mood?.toLowerCase()) {
    case 'happy':
      return 'success';
    case 'excited':
      return 'warning';
    case 'sad':
      return 'danger';
    default:
      return 'secondary';
  }
};

export const getMoodIcon = (mood) => {
  switch (mood?.toLowerCase()) {
    case 'happy':
      return 'fa-smile';
    case 'excited':
      return 'fa-grin-stars';
    case 'sad':
      return 'fa-sad-tear';
    default:
      return 'fa-meh';
  }
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};