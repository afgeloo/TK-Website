import Advocacies from "./eventspage-advocacies"; // Corrected import path
import Footer from "../footer";
import Header from "../header";
import EventsPageRSVP from "./eventspage-rsvp";
// import Eventrouter from "./eventrouter";
import Detailspage from "./eventpage-details"; // Corrected import path


function Eventspage() {
    return (
        <div>
                       {/* <Header />
                       <Advocacies /> */}
            <EventsPageRSVP />
            {/* <Detailspage /> */}
            {/* <Footer /> */}
        </div>
    );
}

export default Eventspage;