import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEvents, convertTo12HourFormat, formatDateRSVP } from "./mockServer";
import "./css/eventpage-rsvp.css";
import locationIconeventspage from "../assets/eventspage/Location-eventspage.png";
import searchIconEventspage from "../assets/eventspage/Search-icon-events.png";
import CowCurrentEvent from "../assets/eventspage/no_current_event.png";
import PreloaderEvents from "./loader-events";

export interface Event {
  event_id: string;
  event_image: string;
  event_category: string;
  event_title: string;
  event_date: string; // ISO date string, e.g., "2024-04-01"
  event_start_time: string; // e.g., "13:00:00"
  event_end_time: string;
  event_venue: string;
  event_content: string;
  event_speakers: string;
  event_status: string;
  created_at: string; // ISO datetime string
}

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

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents().then((data) => {
      if (Array.isArray(data)) {
        setEvents(data);
      }
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Filter events based on viewType
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

        {/* Toggle */}
        <div className="event-toggle-wrapper">
          <div className="event-toggle-background">
            <span className={`toggle-indicator ${viewType.toLowerCase()}`}></span>

            <button
              className={`toggle-segment ${viewType === "UPCOMING" ? "active" : ""}`}
              onClick={() => setViewType("UPCOMING")}
            >
              UPCOMING
            </button>
            <button
              className={`toggle-segment ${viewType === "PAST" ? "active" : ""}`}
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
                src={event.event_image}
                alt={event.event_title || "No image available"}
                className="event-image"
              />
              <h3 className="event-title">{event.event_title}</h3>
              <p className="event-category">{event.event_category}</p>
              <p className="event-date">
                {formatDateRSVP(event.event_date)} <br />
                {convertTo12HourFormat(event.event_start_time)}
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
                      e.stopPropagation(); // Prevent event bubbling
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
          <img src={CowCurrentEvent} alt="No Events" className="no-events-image" />
          <div className="no-events-bubble">
            <p className="no-events-text">No events found.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventsPageRSVP;