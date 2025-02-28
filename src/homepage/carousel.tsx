import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import "./css/carousel.css";

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

export default function Carousel({
  slides,
  autoSlide = false,
  autoSlideInterval = 3000,
}: CarouselProps) {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval]);

  return (
    <div className="overflow-hidden">
      <div
        className="flex"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="carousel-slide">
            <img src={slide.image} alt={`Slide ${index}`} />
            <div className="description-overlay">
            <div className="description-content">
                <span className="description-category">{slide.category}</span>
                <h2 className="description-title">{slide.title}</h2>
                <p className="description-date">{slide.date}</p>
                <p className="description-location">{slide.location}</p>
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
          <div
            key={i}
            className={`w-3 ${curr === i ? "p-2" : "bg-opacity-50"}`}
          />
        ))}
      </div>
    </div>
  );
}
