import Footer from "../footer";
import Header from "../header";
import EventsPageRSVP from "./eventspage-rsvp";
import Pastevents from "./eventspage-pastevents"; 


function Eventspage() {
    return (
        <div>
            <Header />
            <EventsPageRSVP />
            <Footer />
        </div>
    );
}

export default Eventspage;
