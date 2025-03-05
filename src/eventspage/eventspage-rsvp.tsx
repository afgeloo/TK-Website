import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { fetchEvents } from "./mockServer";
import "./css/eventpage-rsvp.css";
import locationIconeventspage from "../assets/eventspage/Location-eventspage.png";
<<<<<<< HEAD
import { Link } from "react-router-dom";  
import EventDetails from "./eventpage-details"; // Import EventDetails component


function EventsPageRSVP() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
=======
import searchIconEventspage from "../assets/eventspage/Search-icon-events.png"; // Import search icon

function EventsPageRSVP() {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [category, setCategory] = useState("");
    const navigate = useNavigate(); // Initialize navigation function
>>>>>>> b7a2e9c19bb013c93e3503885ae10c2efde26757

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
<<<<<<< HEAD
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
=======
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
>>>>>>> b7a2e9c19bb013c93e3503885ae10c2efde26757
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EventsPageRSVP;