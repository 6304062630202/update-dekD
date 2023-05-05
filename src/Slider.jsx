import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./Slider.css";

const NEXT = 'next';
const PREV = 'prev';

const getOrder = (index, curSlile, numItems) => {
  return index - curSlile < 0 ? numItems - Math.abs(index - curSlile) : index - curSlile;
};

const Slider = ( {children} ) => {
  const numItems = React.Children.count(children);
  const [ sliding, setSliding ] = useState(false);
  const [ direction, setDirection ] = useState('');
  const [ curSlile, setcurSlile ] = useState(0);

  const slideNext = () => {
    setSliding(true);
    setDirection(NEXT);
    setcurSlile(curSlile === numItems - 1 ? 0 : curSlile + 1);

    setTimeout(stopSliding, 50);
  };

  const slidePrev = () => {
    setSliding(true);
    setDirection(PREV);
    setcurSlile(curSlile === 0 ? numItems - 1 : curSlile - 1);

    setTimeout(stopSliding, 50);
  };

  const stopSliding = () => setSliding(false)

  const slide = (direction) => {
    if (direction === NEXT) {
      slideNext()
    } else {
      slidePrev()
    }
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => slide(NEXT),
    onSwipedRight: () => slide(PREV),
    swipeDuration: 0,
    preventScrollOnSwipe: true,
    trackMouse: true,
    onSwiped: (eventData) => console.log("User Swiped!", eventData),
    onSwiping: () => console.log('swiping'),
    onSwipedUp: () => console.log('up'),
    touchEventOptions: { passive: true },
  });

  console.log('handler: ', handlers)

  return (
    <div {...handlers} style={{ touchAction: 'pan-y' }}>
      <div className='container'>
        <div className={`slider-container ${direction} ${sliding && 'sliding'}`}>
          {React.Children.map(children, (child, index) => (
            <div className='slider-slot' style={{ order: getOrder(index, curSlile, numItems)}}>
              {child}
            </div>
          ))}
        </div>
        <div className="buttons-container">
          <div className="button-container left">
            <BsArrowLeftCircleFill onClick={() => slide(PREV)} />
          </div>
          <div className="button-container right">
            <BsArrowRightCircleFill onClick={() => slide(NEXT)} />
          </div>
        </div>
        <div className="dots">
          {React.Children.map(children, (_, idx) => (
            <button
              key={idx}
              className={curSlile === idx ? "dot" : "dot dot-inactive"}
              onClick={() => setcurSlile(idx)}
            ></button>
          ))}
        </div>
      </div>
    </div>
);
};

export default Slider;
