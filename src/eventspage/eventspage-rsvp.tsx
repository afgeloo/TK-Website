import React, { useEffect, useState } from "react";
import { fetchEvents } from "./mockServer";
import "./css/eventpage-rsvp.css";
import locationIconeventspage from "../assets/eventspage/Location-eventspage.png";
import EventDetails from "./eventpage-details"; // Import EventDetails component
import searchIconEventspage from "../assets/eventspage/Search-icon-events.png";

function EventsPageRSVP() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 12; // Limit to 12 events per page

    useEffect(() => {
        fetchEvents().then((data) => {
            console.log("Fetched mock data:", data);
            setEvents(data);
        });
    }, []);

    const handleViewDetails = (event) => {
        setSelectedEvent(event);
    };

    const handleBack = () => {
        setSelectedEvent(null);
    };

    // Pagination Logic
    const totalPages = Math.ceil(events.length / eventsPerPage);
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    return (
        <div>
            <div className="search-wrapper">
                <input
                    type="text"
                    className="search-input-eventspage"
                    placeholder="Search in Events"
                />
                <img
                    src={searchIconEventspage}
                    alt="Search"
                    className="search-icon-eventspage"
                />
            </div>
    
            {selectedEvent ? (
                /* Selected Event Details */
                <EventDetails event={selectedEvent} onBack={handleBack} />
            ) : (
                <>
                    {/* Event Grid */}
                    <div className="eventsrsvp-grid">
                        {currentEvents.map((event) => (
                            <div key={event.id} className="event-card">
                                <img src={event.image_url} alt={event.title} className="event-image" />
                                <h3 className="event-title">{event.title}</h3>
                                <p className="event-category">{event.category}</p>
                                <p className="event-date">{event.date}, {event.time}</p>
                                <p className="event-location">
                                    <img src={locationIconeventspage} alt="Location" className="locationevent-icon" />
                                    {event.location}
                                </p>
                                <div className="event-buttons">
                                    <button className="eventrsvp-button">RSVP</button>
                                    <button 
                                        className="detailsevent-button"
                                        onClick={() => handleViewDetails(event)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
    
                    {/* Pagination Controls */}
                    <div className="pagination">
                        <button 
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="pagination-button"
                        >
                            {"<"}
                        </button>
    
                        {[...Array(totalPages)].map((_, index) => (
                            <button 
                                key={index} 
                                onClick={() => setCurrentPage(index + 1)}
                                className={`pagination-button ${currentPage === index + 1 ? "active" : ""}`}
                            >
                                {index + 1}
                            </button>
                        ))}
    
                        <button 
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="pagination-button"
                        >
                            {">"}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
export default EventsPageRSVP;