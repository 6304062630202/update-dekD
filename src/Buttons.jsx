import React from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./Buttons.css";

const Buttons = ({ slidePrev, slideNext }) => {
  return (
    <div>
      <div className='button-container left'>
        <BsArrowLeftCircleFill onClick={slidePrev} />
      </div>
      <div className='button-container right'>
        <BsArrowRightCircleFill onClick={slideNext} />
      </div>
    </div>
  );
};

export default Buttons;
