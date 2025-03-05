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
<<<<<<< HEAD
            {/* <Detailspage /> */}
            {/* <Footer /> */}
=======
            <PastEvents />
            <Footer />
>>>>>>> b7a2e9c19bb013c93e3503885ae10c2efde26757
        </div>
    );
}

export default Eventspage;