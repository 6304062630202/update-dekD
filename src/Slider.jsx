import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./Slider.css";
import img1 from "./img/img1.png";
import img2 from "./img/img2.png";
import img3 from "./img/img3.png";
import img4 from "./img/img4.png";
import img5 from "./img/img5.png";

const slides = [
  { image: img1 },
  { image: img2 },
  { image: img3 },
  { image: img4 },
  { image: img5 },
];

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isSlide, setIsSlide] = useState(false);  
  const [status, setStatus] = useState(''); //next,prev

  const slideNext = () => {
    let nextSlideIndex = slideIndex === slides.length - 1 ? 0 : slideIndex + 1 ;
    setSlideIndex(nextSlideIndex);
    setIsSlide(true);
    setStatus('next');
    
    setTimeout(stopSliding, 50);
  };

  const slidePrev = () => {
    let prevSlideIndex = slideIndex === 0 ? slides.length - 1 : slideIndex - 1 ;
    setSlideIndex(prevSlideIndex);
    setIsSlide(true);
    setStatus('prev');

    setTimeout(stopSliding, 50);
  };

  const handleDotClick = (index) => {
    setSlideIndex(index);
  };

  const stopSliding = () => setIsSlide(false)  

  const handlers = useSwipeable({
    onSwipedLeft: slideNext,
    onSwipedRight: slidePrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    touchEventOptions: { passive: true },
  });

  const getGap = (index) => { //show many pictures
    return index - slideIndex < 0 ? slides.length - Math.abs(index - slideIndex) : index - slideIndex;
  };

  useEffect(() => {  // auto slide
    const interval = setInterval(() => {
      slideNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [slideIndex]);


  return (
    <div {...handlers}>
      <div className='container'>
        <div className={`slider-container ${status} ${isSlide && 'isSlide'}`}> 
            {slides.map((slide, index) => ( //check next,prev isSlide = false
              <img
                key={index}
                src={slide.image}
                alt={`Slide ${index+1}`}
                className={`slide`}
                style={{ gap: getGap(index) }}
              />
            ))}
        </div>
        <div className='buttons-container'>
          <div className='button-container left'>
            <BsArrowLeftCircleFill onClick={slidePrev} />
          </div>
          <div className='button-container right'>
            <BsArrowRightCircleFill onClick={slideNext} />
          </div>
        </div>
        <div className='dots'>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === slideIndex ? "dot" : "dot dot-event"}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;