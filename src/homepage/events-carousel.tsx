import { useState, useEffect, useCallback, memo } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import "./css/events-carousel.css";
import React from "react";

interface Slide {
  image: string;
  category: string;
  title: string;
  date: string;
  location: string;
}

interface CarouselProps {
  slides: Slide[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

const EventsCarousel: React.FC<CarouselProps> = memo(({ 
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
    <div className="overflow-hidden">
      <div className="flex" style={{ transform: `translateX(-${curr * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="carousel-slide">
            <img src={slide.image} alt={`Slide ${index}`} />
            <div className="description-overlay">
              <div className="description-content">
                <span className="description-category">{slide.category}</span>
                <h2 className="description-title">{slide.title}</h2>
                <p className="description-date">{slide.date}</p>
                <div className="description-location">
                  <img src="./src/assets/homepage/loc-pin.png" alt="Location Pin" />
                  <p className="description-location-pin">{slide.location}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute items-center">
        <button onClick={prev} className="p-1">
          <ChevronLeft size={30} />
        </button>
        <button onClick={next} className="p-1">
          <ChevronRight size={30} />
        </button>
      </div>

      {/* Indicators */}
      <div className="bottom-4">
        {slides.map((_, i) => (
          <div key={i} className={`w-3 ${curr === i ? "p-2" : "bg-opacity-50"}`} />
        ))}
      </div>
    </div>
  );
});

export default EventsCarousel;
