import React, { useEffect, useState } from "react";
import "./global-css/gototop.css";
import { IoIosArrowUp } from "react-icons/io";

const GoToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(window.scrollY > 300);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <div className={`go-to-top ${isVisible ? "show" : ""}`} onClick={scrollToTop}>
            <IoIosArrowUp size={24} />
        </div>
    );
};

export default GoToTop;
