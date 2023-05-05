import React from 'react';
import Slider from "./Slider.jsx";

import img1 from "./img/img1.png";
import img2 from "./img/img2.png";
import img3 from "./img/img3.png";
import img4 from "./img/img4.png";
import img5 from "./img/img5.png";



function App() {
  const slides = [
    { image: img1 },
    { image: img2 },
    { image: img3 },
    { image: img4 },
    { image: img5 },
  ];
  return (
    <div className="App">
      <Slider>
        {slides.map((s, index) => (
          <img src={s.image} alt={`Slide ${index}`} />
        ))}
      </Slider>
    </div>
  );
}

export default App;
