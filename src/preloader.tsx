import React from "react";
import "./global-css/preloader.css"; 

const Preloader: React.FC = () => {
  return (
    <div className="preloader">
      <div className="preloader-logo">
        <img src="./src/assets/logos/preloader.png" alt="Loading..." />
      </div>
      <p className="preloader-text">LOADING</p>
    </div>
  );
};

export default Preloader;
