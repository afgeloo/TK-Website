import Advocacies from "./eventspage-advocacies"; // Corrected import path
import Footer from "../footer";
import Header from "../header";
import EventsPageRSVP from "./eventspage-rsvp";



function Eventspage() {
    return (
        <div>
                        <Header />
            <Advocacies />
            <EventsPageRSVP />
            <Footer />
        </div>
    );
}

export default Eventspage;