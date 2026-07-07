import { useState, useEffect } from "react"
import EventType, { EventObject } from "../../types/event.ts"
import { getEventById } from "../services/eventService";
import { useParams } from "react-router-dom";
import CommentCard from "../components/CommentCard.tsx";
import CommentType from "../../types/comment.ts";
import { createComment, getAllCommentsForEvent } from "../services/commentService.ts";
import RsVPButton from "../components/RSVPButton.tsx";

const EventDetail: React.FC = () => {
    const [eventDetails, setEventDetails] = useState<EventType>(EventObject);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState<CommentType[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [content, setContent] = useState('');

    const { id } = useParams();

    const storeComment = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("User is not authenticated.");
            }
            if (!id) {
                throw new Error("No event id was found")
            }
                await createComment(token, content, id)

            window.location.reload();
        } catch (err) {
            if (err instanceof Error) {
            setError(err.message)                
            }

        }
    }

    useEffect(() => {

        const fetchEventDetails = async () => {
            try {
                if (id) {
                const event = await getEventById(id);
                const comment = await getAllCommentsForEvent(id)
                setEventDetails(event);
                setComments(comment)
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

                <RsVPButton eventId={eventDetails.id} />

            <div>
                <form onSubmit={storeComment} method="POST" action="">
                    <label>Add Comment</label>
                    <input
                        type='text'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
                {comments.length === 0 ? (
                    <div>No comments yet.</div>
                ) : (
                    comments.map((comment) => (
                        <CommentCard key={comment.id} comment={comment} />
                    ))
                )}

        </div>
    )
}

export default EventDetail;