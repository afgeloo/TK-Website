import Advocacies from "./eventspage-advocacies"; // Corrected import path
import Footer from "../footer";
import Header from "../header";
import EventsPageRSVP from "./eventspage-rsvp";
// import Eventrouter from "./eventrouter";
import Detailspage from "./eventpage-details"; // Corrected import path
import Pastevents from "./eventspage-pastevents"; // Corrected import path


function Eventspage() {
    return (
        <div>
                       <Header />
                       <Advocacies />
            <EventsPageRSVP />
            <Pastevents />
            <Footer />
        </div>
    );
}

export default Eventspage;