import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback, memo } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import "./css/bgcarousel.css";
const BgCarousel = memo(({ slides, autoSlide = false, autoSlideInterval = 3000 }) => {
    const [curr, setCurr] = useState(0);
    const prev = useCallback(() => {
        setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
    }, [slides.length]);
    const next = useCallback(() => {
        setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
    }, [slides.length]);
    useEffect(() => {
        if (!autoSlide)
            return;
        const slideInterval = setInterval(next, autoSlideInterval);
        return () => clearInterval(slideInterval);
    }, [autoSlide, autoSlideInterval, next]);
    return (_jsxs("div", { className: "bg-overflow-hidden", children: [_jsx("div", { className: "bg-flex", style: { transform: `translateX(-${curr * 100}%)` }, children: slides.map((slide, index) => (_jsxs("div", { className: "bg-carousel-slide", children: [_jsx("img", { src: slide.image, alt: `Slide ${index}` }), _jsx("div", { className: "bg-description-overlay", children: _jsx("div", { className: "bg-description-content" }) })] }, index))) }), _jsxs("div", { className: "bg-absolute bg-items-center", children: [_jsx("button", { onClick: prev, className: "bg-p-1", children: _jsx(ChevronLeft, { size: 30 }) }), _jsx("button", { onClick: next, className: "bg-p-1", children: _jsx(ChevronRight, { size: 30 }) })] }), _jsx("div", { className: "bg-bottom-4", children: slides.map((_, i) => (_jsx("div", { className: `bg-w-3 ${curr === i ? "bg-p-2" : "bg-opacity-50"}` }, i))) })] }));
});
export default BgCarousel;
