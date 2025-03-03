import "./css/briefbg-sec.css";
import { memo } from "react";
import BgCarousel from "./bgcarousel";

const assetsPath = "./src/assets/homepage/";
const assetsPath1 = "./src/assets/aboutpage/";

const slides = [
  { 
    image: `${assetsPath}events-1.jpg`, 
  },
  { 
    image: `${assetsPath}events-2.jpg`, 
  },
  { 
    image: `${assetsPath}events-3.jpg`, 
  },
  { 
    image: `${assetsPath}events-4.jpg`, 
  },
];

const BriefBg: React.FC = memo(() => (
  <div className="briefbg-sec">
    <div className="briefbg-carousel-bg">
        <img src={`${assetsPath1}briefbg-ribbon.png`} alt="Brief Background Carousel Background" />
    </div>
    <div className="carousel-container">
        <BgCarousel slides={slides} autoSlide autoSlideInterval={5000} />
    </div>
    <div className="briefbg-sec-content">
      <h1 className="briefbg-header">Brief Background</h1>
      <p className="briefbg-description">
        Ang Tara Kabataan (TK) ay naitatag noong Hulyo 3, 2022, pagkatapos ng 2022 national elections. Sa tulong ng DAKILA at Partido Manggagawa, nabuo ang pormasyon na binubuo ng mga boluntaryo mula sa national campaign sa Maynila. Mula rito, nagpasya ang mga kabataan na hindi lang kandidato ang susuportahan kundi mga pangmatagalang adbokasiya. Layunin din nilang bumuo ng malalalim na ugnayan sa iba’t ibang organisasyon at komunidad. Nagsimula ang TK sa boluntaryong pagtulong sa mga relief operations tuwing may sakuna at Brigada Eskwela sa mga pampublikong paaralan. Sa kasalukuyan, mas malawak na ang sakop nito, na may ugnayan sa maraming komunidad sa Maynila at sa ibang lungsod. 
        May limang pangunahing adbokasiya ang TK: karunungan, kasarian, kalikasan, kalusugan, at kultura. Sa lahat ng gawain, nakasentro ang TK sa tao at karapatang pantao, kasama ang mga kabataan sa pagtataguyod ng kaginhawaan para sa lahat.
      </p>
    </div>
    <hr className="briefbg-line" />
  </div>
));

export default BriefBg;
