import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchEvents } from "./mockServer";
import "./css/eventdetails.css";

function EventDetails({ event, onBack }) {
    if (!event) {
        return <h1>Event Not Found</h1>;
    }

    return (
        <div className="event-soledetails-container">
            <div className="event-details-main">
                <img src={event.image_url} alt={event.title} className="event-details-image" />
                <div className="event-info">
                    <h1 className="event-title">{event.title}</h1>
                    <p className="event-date-time"><strong>Date & Time:</strong> {event.date}, {event.time}</p>
                    <p className="event-locationdetails"><strong>Location:</strong> {event.location}</p>
                </div>
            </div>

            <div className="event-details-extra">
                <h2>About the Event</h2>
                <p className="event-details-about">{event.about}</p>
                <p className="event-speaker">{event.speaker}</p>
                <h3>Location:</h3>
                <a href={event.map_url} target="_blank" rel="noopener noreferrer" className="event-map-link">
                    <button className="event-map-button">View on Google Maps</button>
                </a>
            </div>

            <button className="event-details-back-button" onClick={onBack}>Go Back</button>
        </div>
    );
}

export default EventDetails;
