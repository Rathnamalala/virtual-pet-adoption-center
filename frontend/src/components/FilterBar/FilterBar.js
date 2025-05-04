
import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

const FilterBar = ({ selectedMood, onFilterChange }) => {
  const moods = ['all', 'Happy', 'Excited', 'Sad'];

  return (
    <div className="d-flex justify-content-end mb-3">
      <ButtonGroup>
        {moods.map(mood => (
          <Button
            key={mood}
            variant={selectedMood === mood ? 'primary' : 'outline-primary'}
            onClick={() => onFilterChange(mood)}
            className="filter-btn"
          >
            {mood === 'all' ? 'All Pets' : `${mood} Pets`}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default FilterBar;