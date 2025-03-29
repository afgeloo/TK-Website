import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchEvents } from "./mockServer";
import "./css/eventdetails.css";
import locationIconeventspageDetails from "../assets/eventspage/Location-eventspage.png";

function EventDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        fetchEvents().then((data) => {
            const found = data.find((e) => e.id.toString() === id);
            setEvent(found || null);
        });
    }, [id]);

    if (!event) return <h1>Event Not Found</h1>;

    return (
        <div className="event-soledetails-container">
            {/* Left side: Image */}
            <div className="event-image-container">
                <img src={event.image_url} alt={event.title} className="event-details-image" />
                <p className="event-speaker"><strong>Speaker/s:</strong></p>
                <div className="custom-divider-details2"></div>
                <p className="event-speakernames">{event?.speaker || 'To be announced'}</p>
                <p className="event-going">{event.going} <strong>Going</strong></p>
                <div className="custom-divider-details2"></div>
                <p className="location-header-event">Location:</p>
                <div className="custom-divider-details2"></div>

                <a
                    href={event?.map_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="event-map-link"
                >
                    <div className="event-map-container">
                        <iframe
                            src={`https://www.google.com/maps?q=${encodeURIComponent(event?.location || 'Default Location')}&z=18&output=embed`}
                            width="300"
                            height="300"
                            style={{ border: 0 }}
                            loading="lazy"
                            className="event-map-iframe"
                        ></iframe>
                    </div>
                </a>
            </div>

            {/* Right side: Title + Info */}
            <div className="event-content">
                <h1 className="event-details-title">{event.title}</h1>
                <p className="event-date-details">{event.date}, {event.day}</p>
                <p className="event-details-time">{event.starttime} - {event.endtime}</p>
                <p className="event-locationdetails">
                    <img src={locationIconeventspageDetails} alt="Location" className="locationevent-icon-details" />
                    {event.location}
                </p>

                {/* About */}
                <p className="about-details-event-title">About the Event</p>
                <div className="custom-divider-details"></div>
                <p className="event-details-about">{event.about}</p>

                <button className="eventrsvp-button-details">RSVP</button>
            </div>

            {/* Back Button */}
            <button className="event-details-back-button" onClick={() => navigate("/events")}>
                Go Back
            </button>
        </div>
    );
}

export default EventDetails;
