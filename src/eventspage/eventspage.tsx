import Footer from "../footer";
import Header from "../header";


function EventsPage(){
    return (
        <div className="events-page">
            <div>
                <Header />
            </div>
            <div className="events-page-content">
                <h1 className="events-page-header">EVENTS</h1>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default EventsPage;