import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Import navigation hook
import { fetchEvents } from "./mockServer";
import "./css/eventpage-rsvp.css";
import locationIconeventspage from "../assets/eventspage/Location-eventspage.png";
import searchIconEventspage from "../assets/eventspage/Search-icon-events.png"; // Import search icon

function EventsPageRSVP() {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [category, setCategory] = useState("");
    const navigate = useNavigate(); // Initialize navigation function

    useEffect(() => {
        fetchEvents().then((data) => {
            console.log("Fetched mock data:", data);
            setEvents(data);
        });
    }, []);

    return (
        <div className="eventsrsvp-container">
            <div className="search-wrapper">
                <img src={searchIconEventspage} alt="Search" className="search-icon-eventspage" />
                <input
                    type="text"
                    className="search-input-eventspage"
                    placeholder="Search events"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="eventsrsvp-grid">
                {events.map((event) => (
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

                            {/* View Details Button Navigates to Event Details Page */}
                            <button 
                                className="detailsevent-button"
                                onClick={() => navigate(`/event/${event.id}`)}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EventsPageRSVP;
