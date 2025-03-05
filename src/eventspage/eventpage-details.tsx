import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchEvents } from "./mockServer";

function EventDetails() {
    const { id } = useParams(); // Get event ID from URL
    const [event, setEvent] = useState(null);

    useEffect(() => {
        fetchEvents().then((events) => {
            const selectedEvent = events.find(event => event.id.toString() === id);
            setEvent(selectedEvent);
        });
    }, [id]);

    if (!event) {
        return <p>Loading event details...</p>;
    }

    return (
        <div className="event-details">
            <h1>{event.title}</h1>
            <img src={event.image_url} alt={event.title} className="event-detail-image" />
            <p><strong>Category:</strong> {event.category}</p>
            <p><strong>Date:</strong> {event.date}, {event.time}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <button onClick={() => window.history.back()}>Go Back</button>
        </div>
    );
}

export default EventDetails;
