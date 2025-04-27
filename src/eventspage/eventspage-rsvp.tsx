import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/eventpage-rsvp.css";
import locationIconeventspage from "../assets/eventspage/Location-eventspage.png";
import searchIconEventspage from "../assets/eventspage/Search-icon-events.png";
import PreloaderEvents from "./loader-events";

export interface Event {
  event_id: string;
  event_image: string;
  event_category: string;
  event_title: string;
  event_date: string;
  event_start_time: string;
  event_end_time: string;
  event_venue: string;
  event_content: string;
  event_speakers: string;
  event_status: string;
  created_at: string;
}

const getFullImageUrl = (imageUrl: string) => {
  if (!imageUrl) return "";
  if (imageUrl.startsWith("http")) return imageUrl;
  return `http://localhost${imageUrl}`;
};

const formatDateRSVP = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long", 
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(dateString);
  const formatted = date.toLocaleDateString(undefined, options);

  const parts = formatted.split(", ");
  if (parts.length === 3) {
    return `${parts[1]}, ${parts[2]} - ${parts[0]}`;
  }
  return formatted;
};


const convertTo12HourFormat = (time: string) => {
  if (!time) return "";
  const [hourStr, minuteStr] = time.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = minuteStr;
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
};

function EventsPageRSVP() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsToShow, setEventsToShow] = useState(12);
  const [viewType, setViewType] = useState<"UPCOMING" | "PAST">("UPCOMING");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const categories = ["ALL", "KALUSUGAN", "KALIKASAN", "KARUNUNGAN", "KULTURA", "KASARIAN"];
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost/tara-kabataan/tara-kabataan-backend/api/events.php");
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const filtered = events.filter((event) => {
      const isMatchingView =
        viewType === "UPCOMING"
          ? event.event_status.toLowerCase() === "upcoming"
          : event.event_status.toLowerCase() === "completed";

      const isMatchingCategory =
        selectedCategory === "ALL" ||
        event.event_category.toUpperCase() === selectedCategory;

      const isMatchingSearch =
        searchQuery.trim() === "" ||
        event.event_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.event_category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.event_venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        formatDateRSVP(event.event_date).toLowerCase().includes(searchQuery.toLowerCase());

      return isMatchingView && isMatchingCategory && isMatchingSearch;
    });

    setFilteredEvents(filtered);
    setCurrentPage(1);
  }, [viewType, selectedCategory, searchQuery, events]);

  const currentEvents = filteredEvents.slice(0, eventsToShow);

  const handleSeeMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setEventsToShow((prev) => prev + 4);
      setLoadingMore(false);
    }, 2000);
  };

  return (
    <div className="events-page-rsvp">
      <div className="events-header-row">
        <h1 className="eventspage-header-EVENTS">EVENTS</h1>
        <div className="event-toggle-wrapper">
          <div className="event-toggle-tabs">
            <button
              className={`event-toggle-tab ${viewType === "UPCOMING" ? "active" : ""}`}
              onClick={() => setViewType("UPCOMING")}
            >
              UPCOMING
            </button>
            <button
              className={`event-toggle-tab ${viewType === "PAST" ? "active" : ""}`}
              onClick={() => setViewType("PAST")}
            >
              PAST
            </button>
          </div>
        </div>
      </div>

      <div className="event-category-search-wrapper">
        <div className="event-category-filter">
          {categories.map((category) => (
            <span
              key={category}
              className={`category-button ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </span>
          ))}
        </div>
        <div className="event-search-bar">
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="event-search-input"
          />
          <img
            src={searchIconEventspage}
            alt="Search"
            className="event-search-icon"
          />
        </div>
      </div>

      <div className="custom-divider-pagination"></div>

      {filteredEvents.length > 0 ? (
        <div className="eventsrsvp-grid">
          {currentEvents.map((event) => (
            <div
              key={event.event_id}
              className="event-card"
              onClick={() => navigate(`/events/${event.event_id}?from=${viewType.toLowerCase()}`)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={getFullImageUrl(event.event_image)}
                alt={event.event_title || "No image available"}
                className="event-image"
              />
              <h3 className="event-title">{event.event_title}</h3>
              <p className="event-category">{event.event_category}</p>
              <p className="event-date">
                {formatDateRSVP(event.event_date)} <br />
                {convertTo12HourFormat(event.event_start_time)} - {convertTo12HourFormat(event.event_end_time)}
              </p>
              <p className="event-location">
                <img
                  src={locationIconeventspage}
                  alt="Location"
                  className="locationevent-icon"
                />
                {event.event_venue}
              </p>
              {viewType === "UPCOMING" && (
                <div className="event-buttons">
                  <button
                    className="eventrsvp-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open("https://docs.google.com/forms/d/1t6zpzidXd5fhIdotpMYwJpOhobaw0VzsYaouREs4kgg/edit", "_blank");
                    }}
                  >
                    RSVP
                  </button>
                </div>
              )}
            </div>
          ))}
          {filteredEvents.length > 0 && eventsToShow < filteredEvents.length && !loadingMore && (
            <div className="see-more-container">
              <button className="see-more-button" onClick={handleSeeMore}>
                See More
              </button>
            </div>
          )}
          {loadingMore && (
            <div className="see-more-loader" style={{ gridColumn: "1 / -1" }}>
              <PreloaderEvents inline />
            </div>
          )}
        </div>
      ) : (
        <div className="no-events-container">
          <p>No events found.</p>
        </div>
      )}
    </div>
  );
}

export default EventsPageRSVP;
