import { useState, useEffect } from "react";
import { fetchEvents } from "./mockServer"; // Assuming you have a function to fetch events
import "./css/eventpage-pastevents.css"; // Import CSS file
import locationIconeventspage from "../assets/eventspage/Location-eventspage.png"; // Import location icon
import searchIconEventspage from "../assets/eventspage/Search-icon-events.png"; // Import search icon

export default function PastEvents() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [showAll, setShowAll] = useState(false);
  

  useEffect(() => {
    fetchEvents().then((data) => {
      setEvents(data);
    });
  }, []);

  const displayedEvents = showAll ? events : events.slice(0, 3);

  return (
    <div className="past-events-container">
      <div className="past-events-header">
        <h1 className="past-events-title">Past Events</h1>
        <div className="custom-divider"></div> {/* Add divider */}
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
                <p className="past-event-date-day">{event.date}</p>
                <p className="past-event-date-weekday">{event.day}</p>
              </div>
              <div className="past-event-details">
                <div className="past-event-card">
                  <div className="past-event-card-content">
                    <div className="past-event-card-text">
                      <p className="past-event-time">{event.time}</p>
                      <p className="past-event-title">{event.title}</p>
                      <p className="past-event-category">{event.category}</p>
                      <p className="past-event-location">
                        <img src={locationIconeventspage} alt="Location" className="locationevent-icon" />
                        {event.location}
                      </p>
                      <p className="past-event-guests">
                        👥 {event.guests} guests
                      </p>
                    </div>
                    <img src={event.image_url} alt={event.title} className="past-event-image" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* See More / See Less Button */}
      <button 
  className={`see-more-button ${showAll ? "see-less" : ""}`} 
  onClick={() => setShowAll(!showAll)}
>
  {showAll ? "See Less" : "See More"}
</button>
    </div>
  );
}