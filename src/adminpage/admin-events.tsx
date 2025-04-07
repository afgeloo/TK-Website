import "./css/admin-events.css";
import president from "../assets/aboutpage/council/president.jpg";
import { BsThreeDots } from "react-icons/bs";
import { FaSearch, FaBell, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";

const AdminEvents = () => {

  interface Event {
    event_id: string;
    image_url: string;
    category: string;
    title: string;
    event_date: string;
    event_start_time: string;
    event_end_time: string;
    event_venue: string;
    content: string;
    event_speakers: string;
    event_going: number;
    event_status: string;
    created_at: string;
    updated_at: string | null;
  }  

  const [events, setEvents] = useState<Event[]>([]);
  const [openCategory, setOpenCategory] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [openCreatedAt, setOpenCreatedAt] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [createdSortOrder, setCreatedSortOrder] = useState("Newest First");
  const [count, setCount] = useState(-1);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    fetch("http://localhost/tara-kabataan-webapp/backend/api/events1.php")
      .then((res) => res.json())
      .then((data) => {
        console.log("EVENTS DATA:", data); 
        setEvents(data.events || []);
      })
      .catch((err) => console.error("Failed to fetch events:", err));
  }, []);

  const filteredEvents = events
  .filter((event) => {
    const matchCategory =
      selectedCategory === "All" ||
      event.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchStatus =
      selectedStatus === "All" ||
      event.event_status.toLowerCase() === selectedStatus.toLowerCase();

    return matchCategory && matchStatus;
  })
  .sort((a, b) => {
    const dateA = new Date(a.event_date).getTime();
    const dateB = new Date(b.event_date).getTime();
    return createdSortOrder === "Newest First" ? dateB - dateA : dateA - dateB;
  });  

  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
  return (
    <div className="admin-events">
      <div className="admin-events-header">
        <div className="admin-events-search-container">
          <FaSearch className="admin-events-search-icon" />
          <input type="text" placeholder="Search" />
        </div>
        <div className="admin-events-header-right">
          <div className="admin-events-bell-wrapper">
            <FaBell className="admin-events-bell-icon" />
            <span className="admin-events-bell-dot"></span>
          </div>
          <div className="admin-events-loggedin-info">
            <img src={president} className="admin-events-loggedin-avatar" />
            <div className="admin-events-loggedin-desc">
              <strong>Yugi Revaula</strong>
              <p>yugirevaula@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-events-lower-header">
        <h1>Events</h1>
        <div className="admin-events-lower-header-right">
        <div className="admin-events-lower-header-show">
          <p>Showing</p>
            <div className="admin-events-lower-header-count" onClick={() => setOpen(!open)}>
              {count === -1 ? 'All' : count}
              <span className="dropdown-arrow">▾</span>
              {open && (
                <div className="admin-events-dropdown-menu">
                  {[-1,...Array.from({ length: 20 }, (_, i) => i + 1)].map((val) => (
                    <div
                      key={val}
                      className="admin-events-dropdown-item"
                      onClick={() => {
                        setCount(val);
                        setOpen(false);
                      }}
                    >
                      {val === -1 ? 'All' : val}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="admin-events-lower-header-select">
            <button>Select</button>
          </div>
          <div className="admin-events-lower-header-new-event">
            <button>
              <FaPlus className="admin-icon-left" />
              Add New Event
            </button>
          </div>
        </div>
      </div>
      <div className="admin-events-main-content">
        <div className="admin-events-scrollable-table">
          <table className="admin-events-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>
                  <div className="admin-events-dropdown-trigger" onClick={() => setOpenCategory(!openCategory)}>
                    Category <span className="admin-header-dropdown-arrow">▾</span>
                    {openCategory && (
                      <div className="admin-header-dropdown-menu">
                        {["All", "Kalusugan", "Kalikasan", "Karunungan", "Kultura", "Kasarian"].map((item) => (
                          <div
                            key={item}
                            className="admin-header-dropdown-item"
                            onClick={() => {
                              setSelectedCategory(item);
                              setOpenCategory(false);
                            }}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </th>
                <th>Title</th>
                <th>
                  <div className="admin-events-dropdown-trigger" onClick={() => setOpenCreatedAt(!openCreatedAt)}>
                    Date <span className="admin-header-dropdown-arrow">▾</span>
                    {openCreatedAt && (
                      <div className="admin-header-dropdown-menu">
                        {["Newest First", "Oldest First"].map((order) => (
                          <div
                            key={order}
                            className="admin-header-dropdown-item"
                            onClick={() => {
                              setCreatedSortOrder(order);
                              setOpenCreatedAt(false);
                            }}
                          >
                            {order}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </th>
                <th>Venue</th>
                <th>
                  <div className="admin-events-dropdown-trigger" onClick={() => setOpenStatus(!openStatus)}>
                    Status <span className="admin-header-dropdown-arrow">▾</span>
                    {openStatus && (
                      <div className="admin-header-dropdown-menu">
                        {["All", "Upcoming", "Ongoing", "Completed", "Archived"].map((status) => (
                          <div
                            key={status}
                            className="admin-header-dropdown-item"
                            onClick={() => {
                              setSelectedStatus(status);
                              setOpenStatus(false);
                            }}
                          >
                            {status}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </th>
                <th>View</th>
              </tr>
            </thead>
            <colgroup>
              <col style={{ width: "80px" }} />
              <col style={{ width: "70px" }} />
              <col style={{ width: "80px" }} />
              <col style={{ width: "70px" }} />
              <col style={{ width: "80px" }} />
              <col style={{ width: "60px" }} />
              <col style={{ width: "40px" }} />
            </colgroup>
            <tbody>
            {(count === -1 ? filteredEvents : filteredEvents.slice(0, count)).length > 0 ? (
              (count === -1 ? filteredEvents : filteredEvents.slice(0, count)).map((event) => (
                  <tr className="admin-events-table-content" key={event.event_id}>
                    <td className="admin-events-id-content">{event.event_id}</td>
                    <td className="admin-events-category-content category-tag">
                      {event.category.toUpperCase()}
                    </td>
                    <td className="admin-events-title-content">{event.title}</td>
                    <td className="admin-events-date-content">{formatDate(event.event_date)}</td>
                    <td className="admin-events-venue-content">{event.event_venue}</td>
                    <td className={`event-status status-${event.event_status.toLowerCase()}`}>
                      {event.event_status.toUpperCase()}
                    </td>
                    <td className="admin-events-more-button">
                      <button onClick={() => setSelectedEvent(event)}>
                        <BsThreeDots />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>No events found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {selectedEvent && (
        <div className="admin-events-view-more">
          <div className="admin-events-modal">
            <div className="admin-events-modal-content">
            <div className="admin-events-float-buttons">
              <button
                className="admin-events-modal-close"
                onClick={() => setSelectedEvent(null)}
              >
                ✕
              </button>
            </div>
            <div className="admin-events-inner-content-modal">
              <div className="admin-events-inner-content-modal-top">
                <div className="admin-events-inner-content-modal-top-left">
                  <h2>Event Details</h2>
                  <div className="admin-events-inner-content-modal-id">
                    <p><strong>ID</strong></p>
                    <p className="admin-events-inner-content-modal-id-content">id</p>
                  </div>
                  <div className="admin-events-inner-content-modal-title">
                    <p><strong>Title</strong></p>
                    <p className="admin-events-inner-content-modal-title-content">title</p>
                  </div>
                  <div className="admin-events-inner-content-modal-category">
                    <p><strong>Category</strong></p>
                    <p className="admin-events-inner-content-modal-category-content">category</p>
                  </div>
                  <div className="admin-events-inner-content-modal-venue">
                    <p><strong>Venue</strong></p>
                    <p className="admin-events-inner-content-modal-venue-content">venue</p>
                  </div>
                  <div className="admin-events-inner-content-modal-status">
                    <p><strong>Status</strong></p>
                    <p className="admin-events-inner-content-modal-status-content">status</p>
                  </div>
                </div>
                <div className="admin-events-inner-content-modal-top-right">
                  <div className="admin-events-inner-content-modal-date">
                    <p><strong>Date</strong></p>
                    <p className="admin-events-inner-content-modal-date-content">date</p>
                  </div>
                  <div className="admin-events-inner-content-modal-time">
                    <div className="admin-events-inner-content-modal-time-start">
                      <p><strong>Start Time</strong></p>
                      <p className="admin-events-inner-content-modal-time-start-content">start time</p>
                    </div>
                    <div className="admin-events-inner-content-modal-time-end">
                      <p><strong>End Time</strong></p>
                      <p className="admin-events-inner-content-modal-time-end-content">end time</p>
                    </div>
                  </div>
                  <div className="admin-events-inner-content-modal-speakers">
                    <p><strong>Speaker/s</strong></p>
                    <p className="admin-events-inner-content-modal-speakers-content">speakers</p>
                  </div>
                </div>
              </div>
              <div className="admin-events-inner-content-modal-bot">
                <div className="admin-events-inner-content-modal-bot-left">

                </div>
                <div className="admin-events-inner-content-modal-bot-right">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default AdminEvents;
