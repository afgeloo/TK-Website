import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/eventpage-rsvp.css";
import locationIconeventspage from "../assets/eventspage/Location-eventspage.png";
import searchIconEventspage from "../assets/eventspage/Search-icon-events.png";
import Preloader from "../preloader";

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
  return `http://172.20.98.49${imageUrl}`;
};

const formatDateRSVP = (dateString: string) => {
  if (!dateString || isNaN(Date.parse(dateString))) return "Invalid date";
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });
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
  const [eventsToShow, setEventsToShow] = useState(() => {
    const saved = sessionStorage.getItem("eventShowCount");
    return saved ? parseInt(saved) : 12;
  });  
  const [viewType, setViewType] = useState<"UPCOMING" | "PAST">(() => {
    return (sessionStorage.getItem("eventViewType") as "UPCOMING" | "PAST") || "UPCOMING";
  });  
  const [selectedMonth, setSelectedMonth] = useState("ALL");
  const [selectedYear, setSelectedYear] = useState("ALL");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return sessionStorage.getItem("eventCategory") || "ALL";
  });  
  const [searchQuery, setSearchQuery] = useState(() => {
    return sessionStorage.getItem("eventSearchQuery") || "";
  });
  const categories = ["ALL", "KALUSUGAN", "KALIKASAN", "KARUNUNGAN", "KULTURA", "KASARIAN"];
  const [loading, setLoading] = useState(true);
  const [restoringScroll, setRestoringScroll] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
      const res = await fetch("http://172.20.98.49/tara-kabataan/tara-kabataan-backend/api/events.php");        
      const data = await res.json();
        console.log("Fetched events data:", data); 
        setEvents(data);
    
        const savedScroll = sessionStorage.getItem("eventScrollY");
        if (savedScroll) {
          requestAnimationFrame(() => {
            setTimeout(() => {
              window.scrollTo({ top: parseInt(savedScroll), behavior: "auto" });
              sessionStorage.removeItem("eventScrollY");
              sessionStorage.removeItem("eventViewType");
              sessionStorage.removeItem("eventCategory");
              sessionStorage.removeItem("eventSearchQuery");
              setRestoringScroll(false);
            }, 500); 
          });
        } else {
          setRestoringScroll(false);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setRestoringScroll(false);
      } finally {
        setLoading(false);
      }
    };    
  
    fetchEvents();
  }, []);  

  useEffect(() => {
  const now = new Date();

  const filtered = events.filter((event) => {
    const eventDate = new Date(event.event_date);
    const eventMonth = eventDate.toLocaleString("default", { month: "long" });
    const eventYear = eventDate.getFullYear().toString();

    const [startHour, startMinute] = event.event_start_time.split(":").map(Number);
    const [endHour, endMinute] = event.event_end_time.split(":").map(Number);

    const eventStartDateTime = new Date(eventDate);
    eventStartDateTime.setHours(startHour, startMinute, 0, 0);

    const eventEndDateTime = new Date(eventDate);
    eventEndDateTime.setHours(endHour, endMinute, 0, 0);

    const isOngoingNow = now >= eventStartDateTime && now <= eventEndDateTime;
    const isFutureEvent = now < eventStartDateTime;
    const isPastEvent = now > eventEndDateTime;

    let correctedStatus = event.event_status.toLowerCase();

    if (correctedStatus === "upcoming" && isOngoingNow) {
      correctedStatus = "ongoing";
    }
    if ((correctedStatus === "upcoming" || correctedStatus === "ongoing") && isPastEvent) {
      correctedStatus = "completed";
    }

    const isMatchingView =
      viewType === "UPCOMING"
        ? correctedStatus === "upcoming" || correctedStatus === "ongoing"
        : correctedStatus === "completed";

    const isMatchingCategory =
      selectedCategory === "ALL" || event.event_category.toUpperCase() === selectedCategory;

    const isMatchingSearch =
      searchQuery.trim() === "" ||
      event.event_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.event_category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.event_venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      formatDateRSVP(event.event_date).toLowerCase().includes(searchQuery.toLowerCase());

    const isMatchingMonth = selectedMonth === "ALL" || eventMonth === selectedMonth;
    const isMatchingYear = selectedYear === "ALL" || eventYear === selectedYear;

    return (
      isMatchingView &&
      isMatchingCategory &&
      isMatchingSearch &&
      isMatchingMonth &&
      isMatchingYear
    );
  });

  setFilteredEvents(filtered);
  setCurrentPage(1);
}, [viewType, selectedCategory, searchQuery, selectedMonth, selectedYear, events]);
  

  const currentEvents = filteredEvents.slice(0, eventsToShow);

  const handleSeeMore = () => {
    setEventsToShow((prev) => prev + 4);
  };  

  const handleSeeLess = () => {
    setEventsToShow((prev) => Math.max(12, prev - 4));
  };  

  return (
    <div className="events-page-rsvp">
      {loading || restoringScroll ? (
        <Preloader />
      ) : (
        <>
          <div className="events-header-row">
            <h1 className="eventspage-header-EVENTS">Events</h1>
          </div>
          <div className="events-header-row-2">
          <div className="event-search-bar">
            <img
              src={searchIconEventspage}
              alt="Search"
              className="event-search-icon"
            />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="event-search-input"
            />
          </div>
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
          <div className="event-category-search-wrapper">
            <div className="event-category-filter">
              <div className="category-buttons-desktop">
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
              <div className="category-dropdown-mobile">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="category-select"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="event-filter-wrapper">
                <select
                  className="event-filter-dropdown"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  <option value="ALL">All Months</option>
                  {[...new Set(events
                    .filter(e => !!e.event_date && !isNaN(new Date(e.event_date).getTime()))
                    .map(e => new Date(e.event_date).toLocaleString("default", { month: "long" }))
                  )].sort().map((month) => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>

                <select
                  className="event-filter-dropdown"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="ALL">All Years</option>
                  {[...new Set(events
                    .filter(e => !!e.event_date && !isNaN(new Date(e.event_date).getTime()))
                    .map(e => new Date(e.event_date).getFullYear().toString())
                  )].sort().map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
            </div>
          </div>
  
          <div className="custom-divider-pagination"></div>
  
          {filteredEvents.length > 0 ? (
            <div className="eventsrsvp-grid">
              {currentEvents.map((event) => (
                <div
                  key={event.event_id}
                  className="event-card"
                  onClick={() => {
                    sessionStorage.setItem("eventScrollY", window.scrollY.toString());
                    sessionStorage.setItem("eventViewType", viewType);
                    sessionStorage.setItem("eventCategory", selectedCategory);
                    sessionStorage.setItem("eventSearchQuery", searchQuery);
                    sessionStorage.setItem("eventShowCount", eventsToShow.toString()); 
                    navigate(`/events/${event.event_id}`);
                  }}                  
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
                    {convertTo12HourFormat(event.event_start_time)} -{" "}
                    {convertTo12HourFormat(event.event_end_time)}
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
                          window.open(
                            "https://docs.google.com/forms/d/1t6zpzidXd5fhIdotpMYwJpOhobaw0VzsYaouREs4kgg/edit",
                            "_blank"
                          );
                        }}
                      >
                        RSVP
                      </button>
                    </div>
                  )}
                </div>
              ))}
  
              {filteredEvents.length > 0 && (
                <div className="see-more-container">
                  {eventsToShow < filteredEvents.length && (
                    <button className="see-more-button" onClick={handleSeeMore}>
                      See More
                    </button>
                  )}
                  {eventsToShow > 12 && (
                    <button className="see-less-button" onClick={handleSeeLess}>
                      Show Less
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="no-events-container">
              <p>No events found.</p>
            </div>
          )}
        </>
      )}
    </div>
  );  
}

export default EventsPageRSVP;
