import { Link } from "react-router-dom";
import EventType from "../../../types/event";


export default function EventCard({ event }: { event: EventType }) {
    return (
        <div className="bg-white rounded-2x1 shadow-md p-5 hover:shadow-lg transition duration-200">
            <h2 className="text-x1 font-semibold mb-2">{event.title}</h2>
            <p className="text-gray-600 text-sm mb-2">{event.description}</p>
            <p className="text-gray-500 text-sm mb-4">
                📍 {event.location} <br />
                👤 {event.author?.name || "Unknown"}
            </p>
            <Link
                to={`/event/${event.id}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-x1 hover:bg-blue-700 transition"
            >
                View Details
            </Link>
        </div>
    );
}