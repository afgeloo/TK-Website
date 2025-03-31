import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./css/briefbg-sec.css";
import { memo, useEffect, useState } from "react";
import BgCarousel from "./bgcarousel";
const assetsPath = "./src/assets/homepage/";
const assetsPath1 = "./src/assets/aboutpage/";
const slides = [
    { image: `${assetsPath}events-1.jpg` },
    { image: `${assetsPath}events-2.jpg` },
    { image: `${assetsPath}events-3.jpg` },
    { image: `${assetsPath}events-4.jpg` },
];
const BriefBg = memo(() => {
    const [background, setBackground] = useState("Loading...");
    useEffect(() => {
        fetch("http://localhost/tara-kabataan-webapp/backend/api/aboutus.php")
            .then((res) => {
            if (!res.ok)
                throw new Error("Network response was not ok");
            return res.json();
        })
            .then((data) => {
            if (data.background) {
                setBackground(data.background);
            }
            else {
                setBackground("No background content found.");
            }
        })
            .catch((error) => {
            console.error("Error fetching background:", error);
            setBackground("Failed to load background.");
        });
    }, []);
    return (_jsxs("div", { className: "briefbg-sec", children: [_jsx("div", { className: "briefbg-carousel-bg", children: _jsx("img", { src: `${assetsPath1}briefbg-ribbon.png`, alt: "Brief Background Carousel Background" }) }), _jsx("div", { className: "carousel-container", children: _jsx(BgCarousel, { slides: slides, autoSlide: true, autoSlideInterval: 5000 }) }), _jsxs("div", { className: "briefbg-sec-content", children: [_jsx("h1", { className: "briefbg-header", children: "Brief Background" }), _jsx("p", { className: "briefbg-description", children: background })] }), _jsx("hr", { className: "briefbg-line" })] }));
});
export default BriefBg;
