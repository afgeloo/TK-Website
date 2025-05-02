import { useState, useEffect, useCallback, memo } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import "./css/bgcarousel.css";
import React from "react";

interface Slide {
  image: string;
}

interface CarouselProps {
  slides: Slide[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

const BgCarousel: React.FC<CarouselProps> = memo(({ 
  slides, 
  autoSlide = false, 
  autoSlideInterval = 3000 
}) => {
  const [curr, setCurr] = useState(0);

  const prev = useCallback(() => {
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  }, [slides.length]);

  const next = useCallback(() => {
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  }, [slides.length]);

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, next]);

  return (
    <div className="bg-overflow-hidden">
      <div
        className="bg-flex"
        style={{
          transform: `translateX(-${curr * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="bg-carousel-slide"
            style={{ width: `${100 / slides.length}%` }}
          >        
            <img src={slide.image} alt={`Slide ${index}`} />
            <div className="bg-description-overlay">
              <div className="bg-description-content">
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="bg-absolute bg-items-center">
        <button onClick={prev} className="bg-p-1">
          <ChevronLeft size={30} />
        </button>
        <button onClick={next} className="bg-p-1">
          <ChevronRight size={30} />
        </button>
      </div>

      {/* Indicators */}
      <div className="bg-bottom-4">
        {slides.map((_, i) => (
          <div key={i} className={`bg-w-3 ${curr === i ? "bg-p-2" : "bg-opacity-50"}`} />
        ))}
      </div>
    </div>
  );
});

export default BgCarousel;
