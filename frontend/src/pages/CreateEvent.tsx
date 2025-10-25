import { useState } from "react"
import EventType, { EventObject } from '../../../types/event.ts'
import { useNavigate } from "react-router-dom";
import { createEvent } from "../services/eventService"

const CreateEvent: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false)
    const [eventData, setEventData] = useState<EventType>(EventObject);

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEventData((prev) => ({ ...prev, [name]: value}));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("You must be logged in to create an event")

            await createEvent(eventData, token);
            setSuccess(true);
            setTimeout(() => navigate("/home"), 1500);
        } catch (err: unknown){
            if (err instanceof Error) setError(err.message);
            else setError("An unexpected error occured");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow">
            <h2 className="text-2x1 font-semibold mb-4 text-center">Create New Event</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    type="text"
                    name="title"
                    placeholder="Event Title"
                    value={eventData.title}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2 text-black"
                    required
                />

                <textarea 
                    name="description"
                    placeholder="Event Description"
                    value={eventData.description}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                    rows={4}
                />

                <input 
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={eventData.location}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                    required 
                />

                <input 
                    type="datetime-local"
                    name="date"
                    value={eventData.date || ""}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                    required
                />

                {error && <p className="text-red-500 text-lg">{error}</p>}
                {success && <p className="text-green-600 text-sm">Event Created Successfully</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-60"
                >
                    {loading ? "Creating..." : "Create Event"}
                </button>
            </form>
        </div>
    )
}

export default CreateEvent;