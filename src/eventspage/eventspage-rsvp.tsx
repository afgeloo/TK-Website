import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { fetchEvents } from "./mockServer";
import "./css/eventpage-rsvp.css";
import locationIconeventspage from "../assets/eventspage/Location-eventspage.png";
import { Link } from "react-router-dom";  
import EventDetails from "./eventpage-details"; // Import EventDetails component


function EventsPageRSVP() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

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

    if (selectedEvent) {
        return (
            <EventDetails event={selectedEvent} onBack={handleBack} />
        );
    }

    return (
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
    );
}

export default EventsPageRSVP;