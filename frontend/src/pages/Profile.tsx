import { useEffect, useState } from 'react';
import { getUserProfile } from '../services/userService'
import EventCard from '../components/EventCard';
import UserType from "../../../types/user.ts";


// React profile page
const Profile: React.FC = () => {
    const [user, setUser] = useState<UserType>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        // Gathers user data
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("No authentication token found");
                
                const res: UserType = await getUserProfile(token);

                const mappedEvents = res.events?.map((event) => ({
                    id: event.id,
                    title: event.title,
                    location: event.location,
                    createdAt: event.createdAt,
                    date: event.date,
                    description: event.description,
                }));

                const mappedRsvps = res.rsvps?.map((rsvp) => ({
                    event: {
                        id: rsvp.event.id,
                        title: rsvp.event.title,
                        location: rsvp.event.location,
                        date: rsvp.event.date,
                        createdAt: rsvp.event.createdAt,
                        description: rsvp.event.description,
                    }
                }));

                // Map events and rsvps to match EventItem structure if necessary
                setUser({
                    id: res.id,
                    name: res.name,
                    email: res.email,
                    createdAt: res.createdAt,
                    events: mappedEvents,
                    rsvps: mappedRsvps,
                });
            } catch (error: unknown) {
                if (error instanceof Error)
                setError(error.message || "Failed to load profile.")
            } finally {
                setLoading(false)
            }
        };

        fetchProfile();
    }, []);

    // State check for the app
    if (loading) return <div className='text-center mt-10'>Loading Profile...</div>
    if (error) return <div className='text-red-600 text-center mt-10'>{error}</div>
    if (!user) return <div className='text-center mt-10'>No user data found</div>

    // Renders profile page with logic
	return (
        <div className='max-w-4x1 mx-auto p-6'>
            <h1 className="text-3x1 font-bold mb-4">{user.name}'s Profile</h1>
                <p className="text-gray-600 mb-2"><span>Email: </span>{user.email}</p>
                <p className='text-gray-600 mb-6'><span>Joined: </span>{user.createdAt}</p>

        <h2 className='text-2x1 font-semibold mb-3'>Your Events</h2>


            {user.events && user.events.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {user.events.map(event => (
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