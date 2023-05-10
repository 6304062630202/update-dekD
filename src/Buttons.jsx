import React from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./Buttons.css";

const ButtonsContainer = ({ slidePrev, slideNext }) => {
  return (
    <div className='buttons-container'>
      <div className='button-container left'>
        <BsArrowLeftCircleFill onClick={slidePrev} />
      </div>
      <div className='button-container right'>
        <BsArrowRightCircleFill onClick={slideNext} />
      </div>
    </div>
  );
};

export default ButtonsContainer;
