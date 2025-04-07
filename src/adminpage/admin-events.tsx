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

  useEffect(() => {
    fetch("http://localhost/tara-kabataan-webapp/backend/api/events1.php")
      .then((res) => res.json())
      .then((data) => {
        console.log("EVENTS DATA:", data); // 🔍 See what you get
        setEvents(data.events || []);
      })
      .catch((err) => console.error("Failed to fetch events:", err));
  }, []);
  

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
            <p>{events.length}</p>
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
                <th>Category</th>
                <th>Title</th>
                <th>Date</th>
                <th>Venue</th>
                <th>Status</th>
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
              {events.length > 0 ? (
                events.map((event) => (
                  <tr className="admin-blogs-table-content" key={event.event_id}>
                    <td>{event.event_id}</td>
                    <td>{event.category}</td>
                    <td>{event.title}</td>
                    <td>{event.event_date}</td>
                    <td>{event.event_venue}</td>
                    <td>{event.event_status}</td>
                    <td className="admin-events-more-button">
                      <button>
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
    </div>
  );
};

export default AdminEvents;
