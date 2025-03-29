import React, { useEffect, useState } from "react";
import { fetchEvents } from "./mockServer";
import { useNavigate } from "react-router-dom";
import "./css/eventpage-rsvp.css";
import locationIconeventspage from "../assets/eventspage/Location-eventspage.png";
import searchIconEventspage from "../assets/eventspage/Search-icon-events.png";

function EventsPageRSVP() {
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 12;
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents().then((data) => {
            setEvents(data);
        });
    }, []);

    const handleViewDetails = (id) => {
        navigate(`/events/${id}`);
    };

    const totalPages = Math.ceil(events.length / eventsPerPage);
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    return (
        <div>
            <div className="search-wrapper-rsvp">
                <input
                    type="text"
                    className="search-input-eventspage-rsvp"
                    placeholder="Search in Events"
                />
                <img
                    src={searchIconEventspage}
                    alt="Search"
                    className="search-icon-eventspage-rsvp"
                />
            </div>

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
                                onClick={() => handleViewDetails(event.id)}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

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

            <div className="custom-divider-pagination"></div>
        </div>
    );
}

export default EventsPageRSVP;
