import { useState, useEffect, } from "react";
import { fetchEvents, formatDatePast, convertTo12HourFormat } from "./mockServer";
import "./css/eventpage-pastevents.css";
import locationIconeventspage from "../assets/eventspage/Location-eventspage.png";
import searchIconEventspage from "../assets/eventspage/Search-icon-events.png";
import { useNavigate, useParams } from "react-router-dom";


export interface Event {
  event_id: string;
  event_image: string;
  event_category: string;
  event_title: string;
  event_date: string;       // ISO date string, e.g., "2024-04-01"
  event_day: string;
  event_start_time: string; // e.g., "13:00:00"
  event_end_time: string;
  event_venue: string;
  event_content: string;
  event_speakers: string;
  event_status: string;
  created_at: string;       // ISO datetime string
}


export default function PastEvents() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("ALL");



  useEffect(() => {
    fetchEvents().then((data) => {
      const upcoming = Array.isArray(data)
        ? data.filter(event => event.event_status === "Completed" || "COMPLETED") 
        : [];
      setEvents(upcoming);
    });
  }, [selectedCategory]);


  // Helper to extract month from date string
  const getMonthName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString('default', { month: 'long' });
  };

  // Helper to extract year
  const getYear = (dateStr) => {
    return new Date(dateStr).getFullYear().toString();
  };

  // 🔎 Filter events based on searchTerm, month, year, and category
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.event_title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMonth = !month || getMonthName(event.event_date) === month;
    const matchesYear = !year || getYear(event.event_date) === year;
    const matchesCategory = !category || event.event_category === category;
    return matchesSearch && matchesMonth && matchesYear && matchesCategory;
  });
  const monthOptions = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const categoryOptions = [
    "Kalusugan", "Kalikasan", "Karunungan", "Kultura", "Kasarian"];

  const displayedEvents = showAll ? filteredEvents : filteredEvents.slice(0, 3);

  const currentYear = new Date().getFullYear();

  // Get earliest year from event list
  const earliestYear = events.length > 0
    ? Math.min(...events.map(e => new Date(e.event_date).getFullYear()))
    : currentYear;

  // Generate list of years from earliest to current
  const yearOptions = [];
  for (let year = earliestYear; year <= currentYear; year++) {
    yearOptions.push(year.toString());
  }

  return (
    <div className="past-events-container">
      <div className="past-events-header">
        <h1 className="past-events-title">Past Events</h1>

        <div className="search-wrapper">
          <img src={searchIconEventspage} alt="Search" className="search-icon-eventspage" />
          <input
            type="text"
            className="search-input-eventspage"
            placeholder="Search events"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select className="search-dropdown" value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="">Month</option>
            {monthOptions.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <select className="search-dropdown" value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">Year</option>
            {yearOptions.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <select
            className="search-dropdown"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Category</option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="custom-divider-pastevents"></div>
      </div>

      <div className="past-events-list">
        <div className={`past-events-box transition-wrapper ${showAll ? "expanded" : "collapsed"}`}>
          {displayedEvents.map((event, index) => (
            <div key={index} className="past-event-item">
              <div className="past-event-date">
                <div className="past-event-date-day">{formatDatePast(event.event_date)},</div>
                <p className="past-event-date-weekday">
                  {new Date(event.event_date).toLocaleDateString('en-US', { weekday: 'long' })}
                </p>
              </div>
              <div className="past-event-details">
                <div className="past-event-card"
                  onClick={() => navigate(`/events/${event.event_id}?from=past`)}
                  style={{ cursor: "pointer" }}>
                  <div className="past-event-card-content">
                    <div className="past-event-card-text">
                      <p className="past-event-time">
                        {convertTo12HourFormat(event.event_start_time)} - {convertTo12HourFormat(event.event_end_time)}
                      </p>
                      <p className="past-event-title">{event.event_title}</p>
                      <p className="past-event-category">{event.event_category}</p>
                      <p className="past-event-location">
                        <img src={locationIconeventspage} alt="Location" className="locationevent-icon" />
                        {event.event_venue}
                      </p>
                      <p className="past-event-guests">
                        👥 {event.event_going || 0} guests
                      </p>
                    </div>
                    <img src={event.event_image} alt={event.event_title} className="past-event-image" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className={`see-more-button ${showAll ? "see-less" : ""}`}
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? "See Less" : "See More"}
      </button>
    </div>
  );
}
