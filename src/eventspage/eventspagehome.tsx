import Footer from "../footer";
import Header from "../header";
import EventsPageRSVP from "./eventspage-rsvp";
import Pastevents from "./eventspage-pastevents"; 
import './css/eventpage-header.css';

function Eventspage() {
    return (
        <div>
            <Header />
            <h1 className="eventspage-header">EVENTS</h1>
            <EventsPageRSVP />
            <Pastevents />
            <Footer />
        </div>
    );
}

export default Eventspage;
