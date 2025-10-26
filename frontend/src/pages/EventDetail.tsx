import { useState, useEffect } from "react"
import EventType, { EventObject } from "../../../types/event.ts"
import { getEventById } from "../services/eventService";
import { useParams } from "react-router-dom";

const EventDetail: React.FC = () => {
    const [eventDetails, setEventDetails] = useState<EventType>(EventObject);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { id } = useParams();

    useEffect(() => {

        const fetchEventDetails = async () => {
            try {
                if (id) {
                const event = await getEventById(id);
                setEventDetails(event);
                }
            } catch (err: unknown) {
                if (err instanceof Error) setError(err.message || "Failed to load event.");
            } finally {
                setLoading(false);
            }
        }

        fetchEventDetails();
    }, [id]);

    // State check for the app
    if (loading) return <div className='text-center mt-10'>Loading Profile...</div>
    if (error) return <div className='text-red-600 text-center mt-10'>{error}</div>
    if (!eventDetails) return <div className='text-center mt-10'>No user data found</div>

    return (
        <div className="max-w-3x1 mx-auto p-6">
            <h1 className="text-3x1 font-bold mb-3">{eventDetails.title}</h1>
            <p className="text-gray-700 mb-6">Event Description: {eventDetails.description}</p>

            <div className="space-y-2 text-gray-600">
                <p>
                    <strong>Hosted by: </strong> { eventDetails.author?.name || "Name not given" }
                </p>
                <p>
                    <strong>Location: </strong> {eventDetails.location}
                </p>
                <p>
                    <strong>When to be there: </strong> {eventDetails.date}
                </p>
            </div>

            <div>
                <h2>RSVP and Comments comming soon!</h2>
            </div>
        </div>
    )
}

export default EventDetail;