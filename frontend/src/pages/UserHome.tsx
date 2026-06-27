import { useEffect, useState } from "react";
import { getAllEvents } from "../services/eventService";
import EventCard from "../components/EventCard";
import EventType from "../../types/event";
import { checkToken } from "../services/authService"

export default function Home() {
    const [events, setEvents] = useState<EventType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [check, setCheck] = useState<boolean | null>(null)

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem("token")
                const check = await checkToken(String(token))

                if (!check) {
                    setCheck(false)
                } else {
                    setCheck(true)
                }

                const data = await getAllEvents();
                setEvents(data as unknown as EventType[]);
            } catch (err) {
                console.error(err);
                setError("Failed to load events. Please try again later.")
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
        }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-600 text-lg">Loading events...</p>
            </div>
        );
    }

    if (!check) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg"> You must be logged in to see events.</p>
                <a href="/login" className="text-blue-600 hover:underline mt-12 mr-0 absolute">Login Page</a>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500 text-2xl">{error}</p>
            </div>
        )
    }
    // Renders Home page with logic
    return (
        <div className="max-w-6x1 mx-auto px-4 py-10">
            <h1 className="text-3x1 font-bold mb-6 text-gray-800">Upcoming Events</h1>

            {events.length === 0 ? (
                <p className="text-gray-500 text-lg">No events found.</p>
            ) : (
                <div>
                    {events.map((event) => (
                        <EventCard key={event.id} event={event}/>
                    ))}
                </div>
            )}

        </div>
    );
}