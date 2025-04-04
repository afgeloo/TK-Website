import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEvents, convertTo12HourFormat, formatDateRSVP } from "./mockServer";
import "./css/eventpage-rsvp.css";
import locationIconeventspage from "../assets/eventspage/Location-eventspage.png";
import searchIconEventspage from "../assets/eventspage/Search-icon-events.png";
import Header from "../header";
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
  const eventsPerPage = 12;
  const [viewType, setViewType] = useState<"UPCOMING" | "PAST">("UPCOMING");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const categories = ["ALL", "KALUSUGAN", "KALIKASAN", "KARUNUNGAN", "KULTURA", "KASARIAN"];


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

      return isMatchingView && isMatchingCategory;
    });

    setFilteredEvents(filtered);
    setCurrentPage(1);
  }, [viewType, selectedCategory, events]);

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  return (
    <div className="events-page-rsvp">
      <div className="events-header-row">
        {/* Heading */}
        <h1
          className="eventspage-header-EVENTS"
          style={{ fontFamily: "'Bogart Trial', sans-serif" }}
        >
          EVENTS
        </h1>

        {/* Toggle */}
        <div className="event-toggle-wrapper">
          <div className="event-toggle-background">
            <span className={`toggle-indicator ${viewType.toLowerCase()}`}></span>

            <button
              className={`toggle-segment ${viewType === "UPCOMING" ? "active" : ""
                }`}
              onClick={() => setViewType("UPCOMING")}
            >
              UPCOMING
            </button>
            <button
              className={`toggle-segment ${viewType === "PAST" ? "active" : ""
                }`}
              onClick={() => setViewType("PAST")}
            >
              PAST
            </button>
          </div>
        </div>

      </div>
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
                src={event.event_image || "/path/to/default-image.png"} // Fallback for missing images
                alt={event.event_title || "Event Image"}
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
                  <button className="eventrsvp-button">RSVP</button>
                  <button
                    className="detailsevent-button"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent card click from firing too
                      navigate(`/events/${event.event_id}?from=upcoming`);
                    }}
                  >
                    View Details
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
}

export default EventsPageRSVP;