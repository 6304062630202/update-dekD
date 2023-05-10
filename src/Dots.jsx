import React from 'react';
import "./Dots.css";

const Dots = ({ slideIndex, handleDotClick, slides }) => {
  return (
    <div className='dots'>
      {slides.map((slide, index) => (
        <button
          key={index}
          className={`dot ${index === slideIndex ? "dot" : "dot dot-event"}`}
          onClick={() => handleDotClick(index)}
        />
      ))}
    </div>
  );
};

export default Dots;
