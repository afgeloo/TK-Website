import React from "react";
import "./global-css/preloader.css"; 
import preloaderImg from "./assets/logos/preloader.png"; 

const Preloader: React.FC = () => {
  return (
    <div className="preloader">
      <div className="preloader-logo">
        <img src={preloaderImg} alt="Loading..." />
        <div className="shadow"></div> {/* Add shadow element */}
      </div>
      <p className="preloader-text">LOADING</p>
    </div>
  );
};

export default Preloader;
