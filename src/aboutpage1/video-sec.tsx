import React from "react";
import ReactPlayer from "react-player";
import "./css/video-sec.css";

const VideoSec: React.FC = () => {
    return (
        <div className="about-video-sec">
            <div className="about-video-description">
                <h1>Let’s take a walk down memory lane to revisit where it all began</h1>
            </div>
            <div className="about-video-container">
                <div className="custom-video-frame">
                    <ReactPlayer 
                        url="https://www.facebook.com/TaraKabataanMNL/videos/330160250091186" 
                        controls 
                        width="100%" 
                        height="100%" 
                    />
                </div>
            </div>
        </div>
    );
};

export default VideoSec;
