import Footer from "../footer";
import Header from "../header";
import AboutAdvocacies from "./advocacies-sec";
import BriefBg from "./briefbg-sec";
import CoreValue from "./coreval-sec";
import Council from "./council";
import VideoSec from "./video-sec";

function AboutPage(){
    return (
        <div className="about-page">
                <Header />
            <div>
                <BriefBg />
                <VideoSec />
                <CoreValue />
                <Council />
                <AboutAdvocacies />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default AboutPage;