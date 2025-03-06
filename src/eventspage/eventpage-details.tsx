import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchEvents } from "./mockServer";
import "./css/eventdetails.css";
import locationIconeventspageDetails from "../assets/eventspage/Location-eventspage.png";

function EventDetails({ event, onBack }) {
    if (!event) {
        return <h1>Event Not Found</h1>;
    }

    return (
        <div className="event-soledetails-container">
            {/* Left side: Image */}
            <div className="event-image-container">
                <img src={event.image_url} alt={event.title} className="event-details-image" />
                <p className="event-speaker"><strong>Speaker/s:</strong></p>
                <div className="custom-divider-details2"></div>
                <p className="event-speakernames"><strong></strong> {event.speaker}</p>
                <p className="event-going"> {event.going} <strong>Going</strong></p>
                <div className="custom-divider-details2"></div>
                <p className="location-header-event">Location:</p>
                <div className="custom-divider-details2"></div>
                <a href={event.map_url} target="_blank" rel="noopener noreferrer" className="event-map-link">
    <div className="event-map-container">
        {/* Automatically generate Google Maps Static Image */}
        <img 
            src={`https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(event.location)}&zoom=15&size=400x300&maptype=roadmap&markers=color:red%7C${encodeURIComponent(event.location)}&key=YOUR_GOOGLE_MAPS_API_KEY`} 
            alt="Event Location" 
            className="event-map-image"
        />
                        <div className="event-map-overlay">
                            <p>View More</p>
                        </div>
                    </div>
                </a>
            </div>

            {/* Right side: Title + Info */}
            <div className="event-content">
                <h1 className="event-details-title">{event.title}</h1>
                <p className="event-date-details"><strong></strong> {event.date}, {event.day} </p>
                <p className="event-details-time"><strong></strong> {event.starttime} - {event.endtime}</p>
                <p className="event-locationdetails">
                    <strong></strong>
                    <img src={locationIconeventspageDetails} alt="Location" className="locationevent-icon-details" /> 
                    {event.location}
                </p>
                {/* About Section */}
                <p className="about-details-event-title">About the Event</p>
                <div className="custom-divider-details"></div>
                <p className="event-details-about">{event.about}</p>
                <button className="eventrsvp-button-details">RSVP</button>
            </div>

            {/* Back Button */}
            <button className="event-details-back-button" onClick={onBack}>Go Back</button>
        </div>
    );
}

export default EventDetails;