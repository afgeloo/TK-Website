import Footer from "../footer";
import Header from "../header";
import BriefBg from "./briefbg-sec";
import CoreValue from "./coreval-sec";
import Council from "./council";
import VideoSec from "./video-sec";

function AboutPage(){
    return (
        <div className="about-page">
            <div>
                <Header />
            </div>
            <div>
                <BriefBg />
                <VideoSec />
                <CoreValue />
                <Council />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default AboutPage;