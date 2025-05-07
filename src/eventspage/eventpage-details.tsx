import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatDateDetails, convertTo12HourFormat } from "./mockServer";
import { ToastContainer, toast } from "react-toastify";
import "./css/eventdetails.css";
import locationIcon from "../assets/eventspage/Location-eventspage.png";
import attachIcon from "../assets/logos/attachicon.jpg";
import Header from "../header";
import Footer from "../footer";
import Preloader from "../preloader";

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
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const from = queryParams.get("from");
  const [event, setEvent] = useState<Event | null>(null);
  const [canCopy, setCanCopy] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchEvent = async () => {
      try {
        const response = await fetch("http://localhost/tara-kabataan/tara-kabataan-backend/api/events.php");
        const data = await response.json();
        const selected = data.find((e: Event) => e.event_id === id);
        setEvent(selected || null);
  
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching event:", error);
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);  

  const copyEventLink = () => {
    if (!canCopy) return;
    setCanCopy(false);
    setTimeout(() => setCanCopy(true), 2000);
    navigator.clipboard.writeText(window.location.href)
      .then(() => toast.success("Link copied!"))
      .catch(() => toast.error("Failed to copy."));
  };

  if (loading || !event) {
    return <Preloader />;
  }
    
  const imageUrl = `http://localhost/${event.event_image}`;

  function formatContent(content: string) {
    if (!content) return "";
    return content
      .replace(/\n/g, "<br>")
      .replace(/  /g, " &nbsp;");
  }  

  if (loading || !event) return <Preloader />;

  return (
    <div className="event-details">
    <Header />
    <div className="event-details-page">
    <div className="back-button-container">
      <button
        className="back-button"
        onClick={() => navigate(-1)}
      >
        ← Go Back
      </button>
    </div>
      <div className="event-details-grid">
        <div className="event-details-left">
          <img src={imageUrl} alt="Event" className="event-details-image" />
          <div className="event-details-info">
            <div className="event-detail-section">
              <p className="event-info-label">Speakers</p>
              <div
            className="event-info-value"
            dangerouslySetInnerHTML={{ __html: formatContent(event.event_speakers || "To be announced") }}
            ></div>
            </div>
            <div className="event-detail-section">
              <p className="event-info-label">Category</p>
              <p className="event-info-category">{event.event_category}</p>
            </div>
            <div className="event-detail-section">
              <p className="event-info-label">Location</p>
              <p className="event-info-value">{event.event_venue}</p>
              <div className="event-map">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(event.event_venue)}&z=18&output=embed`}
                  width="100%"
                  height="250"
                  loading="lazy"
                  style={{ border: "0", borderRadius: "10px" }}
                ></iframe>
              </div>
            </div>
          </div>
          {from === "upcoming" && (
            <button className="event-rsvp-button">RSVP</button>
          )}
        </div>
        <div className="event-details-right">
          <h1 className="event-details-title">{event.event_title}</h1>
          <p className="event-details-date">{formatDateDetails(event.event_date)}, {event.event_day}</p>
          <p className="event-details-time">{convertTo12HourFormat(event.event_start_time)} - {convertTo12HourFormat(event.event_end_time)}</p>
          <div className="event-about-header">
            <span>About the Event</span>
            <div className="copy-link" onClick={copyEventLink}>
              <img src={attachIcon} alt="Copy link" />
            </div>
          </div>
          <div className="event-divider"></div>
          <div
            className="event-about"
            dangerouslySetInnerHTML={{ __html: event.event_content }}
          ></div>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover
        className="custom-toast-container"
        toastClassName="custom-toast"
        limit={1}
      />
    </div>
    <Footer />
    </div>
  );
}

export default EventDetails;
