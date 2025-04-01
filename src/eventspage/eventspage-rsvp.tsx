import React, { useEffect, useState } from "react";
import { fetchEvents, convertTo12HourFormat, formatDateRSVP,} from "./mockServer";
import "./css/eventpage-rsvp.css";
import locationIconeventspage from "../assets/eventspage/Location-eventspage.png";
import searchIconEventspage from "../assets/eventspage/Search-icon-events.png";

export interface Event {
    event_id: string;
    event_image: string;
    event_category: string;
    event_title: string;
    event_date: string;       // ISO date string, e.g., "2024-04-01"
    event_start_time: string; // e.g., "13:00:00"
    event_end_time: string;
    event_venue: string;
    event_content: string;
    event_speakers: string;
    event_status: string;
    created_at: string;       // ISO datetime string
  }
  


function EventsPageRSVP() {
    const [events, setEvents] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 12;

    useEffect(() => {
        fetchEvents().then((data) => {
            const upcoming = Array.isArray(data)
                ? data.filter(event => event.event_status === "Upcoming")
                : [];
            setEvents(upcoming);
            

        });

        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const totalPages = Math.ceil(events.length / eventsPerPage);
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    return (
        <div className="events-page-rsvp">
            {events.length > 0 && (
                <>
                    <div className="eventsrsvp-grid">
                        {currentEvents.map((event) => (
                            <div key={event.event_id} className="event-card">
                                <img
                                    src={event.event_image}
                                    alt={event.event_title}
                                    className="event-image"
                                />
                                <h3 className="event-title">{event.event_title}</h3>
                                <p className="event-category">{event.event_category}</p>
                                <p className="event-date">
                                    {formatDateRSVP(event.event_date)} <br />
                                    {convertTo12HourFormat(event.event_start_time)}
                                </p>
                                <p className="event-location">
                                    <img src={locationIconeventspage} alt="Location" className="locationevent-icon" />
                                    {event.event_venue}
                                </p>
                                <div className="event-buttons">
                                    <button className="eventrsvp-button">RSVP</button>
                                    <button
                                        className="detailsevent-button"
                                        onClick={() =>
                                            window.location.href = `/events/${event.event_id}?from=rsvp`
                                        }
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="pagination-button"
                            >
                                {"<"}
                            </button>

                            {[...Array(totalPages)].map((_, index) => {
                                const pageNum = index + 1;
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`pagination-button ${currentPage === pageNum ? "active" : ""}`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}

                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="pagination-button"
                            >
                                {">"}
                            </button>
                        </div>
                    )}

                    <div className="custom-divider-pagination"></div>
                </>
            )}
        </div>
    );


}

export default EventsPageRSVP;