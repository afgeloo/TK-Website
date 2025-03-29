import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchEvents } from "./mockServer";
import "./css/eventpage-rsvp.css";
import locationIconeventspage from "../assets/eventspage/Location-eventspage.png";
import searchIconEventspage from "../assets/eventspage/Search-icon-events.png";

function EventsPageRSVP() {
    const [events, setEvents] = useState([]);
    const { page } = useParams();
    const navigate = useNavigate();

    const eventsPerPage = 12;
    const currentPage = parseInt(page || "1", 10);

    useEffect(() => {
        fetchEvents().then((data) => {
            setEvents(data);
        });
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);

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

            {/* Pagination Controls */}
            <div className="pagination">
                <button 
                    onClick={() => navigate(`/events/page/${currentPage - 1}`)}
                    disabled={currentPage === 1}
                    className="pagination-button"
                >
                    {"<"}
                </button>

                {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    return (
                        <button 
                            key={pageNum} 
                            onClick={() => navigate(`/events/page/${pageNum}`)}
                            className={`pagination-button ${currentPage === pageNum ? "active" : ""}`}
                        >
                            {pageNum}
                        </button>
                    );
                })}

                <button 
                    onClick={() => navigate(`/events/page/${currentPage + 1}`)}
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
