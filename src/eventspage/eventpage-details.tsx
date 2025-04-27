import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatDateDetails, convertTo12HourFormat } from "./mockServer";
import "./css/eventdetails.css";
import "./css/toast.css";
import locationIconeventspageDetails from "../assets/eventspage/Location-eventspage.png";
import attachIcon from "../assets/logos/attachicon.jpg";
import { ToastContainer, toast } from 'react-toastify';


export interface Event {
    event_id: string;
    event_image: string;
    event_category: string;
    event_title: string;
    event_date: string;
    event_day: string;
    event_start_time: string;
    event_end_time: string;
    event_venue: string;
    event_content: string;
    event_speakers: string;
    event_status: string;
    created_at: string;
    event_going: string;
    map_url: string;
}

function EventDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState<Event | null>(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const from = queryParams.get("from");
    const [canCopy, setCanCopy] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchEvent = async () => {
            try {
                const response = await fetch('http://localhost/tara-kabataan/tara-kabataan-backend/api/events.php');
                const data = await response.json();
                const selected = data.find((e: Event) => e.event_id === id);
                if (selected) {
                    setEvent(selected);
                } else {
                    console.warn("Event not found");
                    setEvent(null);
                }
            } catch (error) {
                console.error("Error fetching event:", error);
                setEvent(null);
            }
        };


        fetchEvent();
    }, [id]);

    const copyEventLink = () => {
        if (!canCopy) return;
      
        setCanCopy(false); 
        setTimeout(() => setCanCopy(true), 2000); 
      
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl)
          .then(() => toast.success("Event link copied!"))
          .catch(() => toast.error("Failed to copy link."));
      };

    if (!event) return null; 
    const imagePath = `http://localhost/${event.event_image}`;
    return (
        <div className="event-soledetails-container">
            <div className="event-image-container">

                <img
                    src={imagePath}
                    alt={imagePath}
                    className="event-details-image"
                />
                <p className="event-speaker"><strong>Speaker/s:</strong></p>
                <div className="custom-divider-details2"></div>
                <p className="event-speakernames">{event.event_speakers || "To be announced"}</p>
                <p className="event-category">
                    <strong>{event.event_category}</strong>
                </p>
                <div className="custom-divider-details2"></div>
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

        {/* Right side: Info */}
        <div className="event-content">
            <h1 className="event-details-title">{event.event_title}</h1>
            <p className="event-date-details">
                {formatDateDetails(event.event_date)}, {event.event_day}
            </p>
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

            <div className="event-details-header-row">
                <p className="about-details-event-title">About the Event</p>

                <div className="event-details-copy-link-container">
                    <span className="event-details-copy-link-text">Copy Link</span>

                    <div className="event-details-copy-link-icon" onClick={copyEventLink}>
                        <img
                            src={attachIcon}
                            alt="Copy link"
                            className="event-details-attach-icon"
                        />
                    </div>
                </div>
            </div>
            <div className="custom-divider-details"></div>
            <div
                className="event-details-about"
                dangerouslySetInnerHTML={{ __html: event.event_content }}
            ></div>

            {from === "upcoming" && (
                <button className="eventrsvp-button-details">RSVP</button>
            )}
        </div>

            <button className="event-details-back-button" onClick={() => navigate("/events")}>
                Go Back
            </button>
         <ToastContainer
         position="top-center"
             autoClose={1500}
             hideProgressBar
             closeOnClick
             rtl={false}
             pauseOnFocusLoss={false}
             pauseOnHover
             className="custom-toast-container"
             toastClassName="custom-toast"
             limit={1}
         />
    
        </div>
        
    );
}

export default EventDetails;