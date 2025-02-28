import BlogsSec from "./blogs-sec";
import EventsSec from "./events-sec";
import WelcomeSec from "./welcome-sec";
import PartnerSec from "./partner-sec";

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