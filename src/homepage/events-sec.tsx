import "./css/events-sec.css";
import Carousel from "./carousel";
import { Link } from "react-router-dom";

const slides = [
    { 
      image: "https://i.ibb.co/ncrXc2V/1.png", 
      category: "Kalusugan",
      title: "Exploring AI Innovations",
      date: "March 15, 2025",
      location: "Google HQ, CA"
    },
    { 
      image: "https://i.ibb.co/B3s7v4h/2.png", 
      category: "Kalikasan",
      title: "Building Scalable Web Apps",
      date: "March 20, 2025",
      location: "Online (Zoom)"
    },
    { 
      image: "https://i.ibb.co/XXR8kzF/3.png", 
      category: "Karunungan",
      title: "Code Your Way to Victory",
      date: "March 25-26, 2025",
      location: "Microsoft Campus, WA"
    },
    { 
      image: "https://i.ibb.co/yg7BSdM/4.png", 
      category: "Kultura",
      title: "Meet Industry Experts",
      date: "March 30, 2025",
      location: "San Francisco, CA"
    },
  ];
  

const EventsSec: React.FC = () => {
  return (
    <div className="events-sec">
        <div className="events-sec-content">
            <h1 className="events-header">EVENTS</h1>
            <div className="carousel-container">
            <Carousel slides={slides} autoSlide autoSlideInterval={5000} />
            </div>
        </div>
        <div className="events-sec-nav">
            <Link to="/Events" className="nav-events">SEE MORE</Link>
        </div>
    </div>
  );
};

export default EventsSec;
