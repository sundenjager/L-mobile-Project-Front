import React from 'react';
import './add.css'; 

const Add = ({ onAdd }) => {
  return (
    <button className="fab-button" onClick={onAdd}>
      +
    </button>
  );
};

export default Add;
