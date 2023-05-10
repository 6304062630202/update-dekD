import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import img1 from "./img/img1.png";
import img2 from "./img/img2.png";
import img3 from "./img/img3.png";
import img4 from "./img/img4.png";
import img5 from "./img/img5.png";
import Buttons from './Buttons';
import Dots from './Dots';
import "./Slider.css";

const slides = [ img1, img2, img3, img4, img5];

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isSlide, setIsSlide] = useState(false);
  const [status, setStatus] = useState(''); //next,prev

  const slideNext = () => {
    let nextSlideIndex = slideIndex === slides.length - 1 ? 0 : slideIndex + 1;
    setSlideIndex(nextSlideIndex);
    setIsSlide(true);
    setStatus('next');

    setTimeout(stopSlide);
  };

  const slidePrev = () => {
    let prevSlideIndex = slideIndex === 0 ? slides.length - 1 : slideIndex - 1;
    setSlideIndex(prevSlideIndex);
    setIsSlide(true);
    setStatus('prev');

    setTimeout(stopSlide);
  };

  const handleDotClick = (index) => {
    setSlideIndex(index);
  };

  const stopSlide = () => setIsSlide(false);

  const handlers = useSwipeable({
    onSwipedLeft: slideNext,
    onSwipedRight: slidePrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    touchEventOptions: { passive: true },
  });

  const getGap = (index) => {
    return index - slideIndex < 0 ? slides.length - Math.abs(index - slideIndex) : index - slideIndex;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      slideNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [slideIndex]);

  return (
    <div {...handlers}>
      <div className='container'>
        <div className={`slider-container ${status} ${isSlide && 'isSlide'}`}>
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              alt={`Slide ${index + 1}`}
              className={`slide`}
              style={{ order: getGap(index) }}
            />
          ))}
        </div>
        <Buttons slidePrev={slidePrev} slideNext={slideNext} />
        <Dots slideIndex={slideIndex} handleDotClick={handleDotClick} slides={slides} />
      </div>
    </div>
  );
};

export default Slider;
