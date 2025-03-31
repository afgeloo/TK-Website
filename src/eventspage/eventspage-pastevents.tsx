import { useState, useEffect } from "react";
import { fetchEvents, formatDate, IMAGE_BASE_URL } from "./mockServer";
import "./css/eventpage-pastevents.css";
import locationIconeventspage from "../assets/eventspage/Location-eventspage.png";
import searchIconEventspage from "../assets/eventspage/Search-icon-events.png";

// ✅ Time conversion function
const convertTo12HourFormat = (time) => {
  if (!time || typeof time !== "string") return "Invalid Time";
  let [hours, minutes] = time.split(":").map(Number);
  if (isNaN(hours) || isNaN(minutes)) return "Invalid Time";
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

export default function PastEvents() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [showAll, setShowAll] = useState(false);
   const [selectedCategory, setSelectedCategory] = useState("ALL");


    useEffect(() => {
        fetchEvents().then((data) => {
          const upcoming = Array.isArray(data)
            ? data.filter(event => event.event_status === "Done")
            : [];
          setEvents(upcoming);
        });
      }, [selectedCategory]);
      

  const displayedEvents = showAll ? events : events.slice(0, 3);

  return (
    <div className="past-events-container">
      <div className="past-events-header">
        <h1 className="past-events-title">Past Events</h1>
        <div className="custom-divider"></div>
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
            <option value="January">January</option>
            <option value="February">February</option>
            {/* Add other months */}
          </select>
          <select className="search-dropdown" value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">Year</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            {/* Add other years */}
          </select>
          <select className="search-dropdown" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Category</option>
            <option value="Karunungan">Karunungan</option>
            <option value="Kalikasan">Kalikasan</option>
            {/* Add other categories */}
          </select>
        </div>
      </div>

      <div className="past-events-list">
        <div className="past-events-box">
          {displayedEvents.map((event, index) => (
            <div key={index} className="past-event-item">
              <div className="past-event-date">
                <p>{formatDate(event.event_date)}</p>
                <p className="past-event-date-weekday">{event.event_day}</p>
              </div>
              <div className="past-event-details">
                <div className="past-event-card">
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
                    <img src={`${IMAGE_BASE_URL}${event.event_image}`} alt={event.event_title} className="past-event-image" />
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
