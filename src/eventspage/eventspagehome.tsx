import Advocacies from "./eventspage-advocacies"; 
import Footer from "../footer";
import Header from "../header";
import EventsPageRSVP from "./eventspage-rsvp";
// import Eventrouter from "./eventrouter";
import Detailspage from "./eventpage-details"; 
import Pastevents from "./eventspage-pastevents"; 


function Eventspage() {
    return (
        <div>
                       <Header />
                       <Advocacies />
            <EventsPageRSVP />
            <Pastevents />
            {/* <Footer /> */}
        </div>
    );
}

export default Eventspage;