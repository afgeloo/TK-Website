import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { IMAGE_BASE_URL, formatDateDetails, convertTo12HourFormat } from "./mockServer";
import "./css/eventdetails.css";
import locationIconeventspageDetails from "../assets/eventspage/Location-eventspage.png";





function EventDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState<any>(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const from = queryParams.get("from");
    useEffect(() => {
        if (!id) return;

        const fetchEvent = async () => {
            try {
                const res = await fetch("http://localhost/TK-ced-branch/TK-Website/backend/api/events.php");
                const data = await res.json();
                const selected = data.find((e: any) => e.event_id === id);
                setEvent(selected);
            } catch (err) {
                console.error("Failed to fetch event:", err);
            }
        };

        fetchEvent();
    }, [id]);

    if (!event) return null; // prevent rendering until event is loaded


    return (
        <div className="event-soledetails-container">
            {/* Left side: Image */}
            <div className="event-image-container">
                <img
                    src={`${IMAGE_BASE_URL}${event.event_image}`}
                    alt={event.event_title}
                    className="event-details-image"
                />
                <p className="event-speaker"><strong>Speaker/s:</strong></p>
                <div className="custom-divider-details2"></div>
                <p className="event-speakernames">{event.event_speakers || "To be announced"}</p>
                <p className="event-going">
                    {event.event_going} <strong>{from === "past" ? "Went" : "Going"}</strong>
                </p>  <div className="custom-divider-details2"></div>
                <p className="location-header-event">Location:</p>
                <div className="custom-divider-details2"></div>

                <a
                    href={event.map_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="event-map-link"
                >
                    <div className="event-map-container">
                        <iframe
                            src={`https://www.google.com/maps?q=${encodeURIComponent(event.event_venue || "Default Location")}&z=18&output=embed`}
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
                <h1 className="event-details-title">{event.event_title}</h1>
                <p className="event-date-details">{formatDateDetails(event.event_date)}, {event.event_day}</p>
                <p className="event-details-time">
                {convertTo12HourFormat(event.event_start_time)} - {convertTo12HourFormat(event.event_end_time)}
                </p>
                <p className="event-locationdetails">
                    <img
                        src={locationIconeventspageDetails}
                        alt="Location"
                        className="locationevent-icon-details"
                    />
                    {event.event_venue}
                </p>

                <p className="about-details-event-title">About the Event</p>
                <div className="custom-divider-details"></div>
                <p className="event-details-about">{event.event_content}</p>

                {from === "rsvp" && (
  <button className="eventrsvp-button-details">RSVP</button>
)}

            </div>

            <button className="event-details-back-button" onClick={() => navigate("/events")}>
                Go Back
            </button>
        </div>
    );
}

export default EventDetails;
