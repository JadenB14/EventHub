import { useEffect, useState } from 'react';
import { getUserById, getUserIdFromToken } from '../services/userService'
import { getEventByUser } from '../services/eventService';
import EventCard from '../components/EventCard';

interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    events?: Event[];
}

interface Event {
    id: string;
    title: string;
    location: string;
    createdAt: string;
    description: string;
}

// React profile page
const Profile: React.FC = () => {
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [events, setEvents] = useState<Event[]>([]);


    useEffect(() => {

        // Gathers user data
        const fetchProfile = async () => {
            try {
                const res = await getUserById(getUserIdFromToken());
                setUser(res.data);
            } catch (error: unknown) {
                if (error instanceof Error)
                setError(error.message || "Failed to load profile.")
            } finally {
                setLoading(false);
            }
        };

        // Gathers event data
        const fetchUserEvents = async () => {
            try {
                const res = await getEventByUser(getUserIdFromToken());
                setEvents(res.data)
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message || "Failed to load profile.");
                } 
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
        fetchUserEvents();
    }, []);

    // State check for the app
    if (loading) return <div className='text-center mt-10'>Loading Profile...</div>
    if (error) return <div className='text-red-600 text-center mt-10'>{error}</div>
    if (!user) return <div className='text-center mt-10'>No user data found</div>

    // Renders profile page with logic
	return (
        <div className='max-w-4x1 mx-auto p-6'>
            <h1 className="text-3x1 font-bold mb-4">{user.name}'s Profile</h1>
                <p className="text-gray-600 mb-2"><span>Email:</span>{user.email}</p>
                <p className='text-gray-600 mb-6'><span>Joined:</span>{user.createdAt}</p>

        <h2 className='text-2x1 font-semibold mb-3'>Your Events</h2>


            {events && events.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {events.map(event => (
                        <EventCard  key={event.id} event={event}/>
                    ))}
                </div>
            ) : (
                <p className='text-gray-500'>You haven't created any events yet.</p>
            )}
        </div>
    );
}

export default Profile;