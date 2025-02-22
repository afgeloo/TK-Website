import BlogsSec from "./blogs-sec";
import EventsSec from "./events-sec";
import PartnerSec from "./partner-sec";
import WelcomeSec from "./welcome-sec";

function HomePage(){
    return(
        <div> 
            <WelcomeSec />
            <EventsSec />
            <BlogsSec />
            <PartnerSec />
        </div>
    )
}

export default HomePage;