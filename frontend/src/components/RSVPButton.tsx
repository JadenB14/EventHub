import { getUserRsvpForEvent, sendRsvp } from "../services/rsvpService";
import { useEffect, useState } from "react";

const RSVP_VALUES = [
    { value: "GOING", label: "Going" },
    { value: "INTERESTED", label: "Interested" },
    { value: "NOT_GOING", label: "Not Going" }
]

export default function RsVPButton({ eventId }: { eventId: string }) {
    const [rsvp, setRsvp] = useState<string>("");
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchUserRsvp = async () => {
            try {
                const token = localStorage.getItem("token")
                if (!token) return;

                const userRsvp = await getUserRsvpForEvent(token, eventId)

                if (userRsvp && userRsvp.status) {
                    setRsvp(userRsvp.status)
                }
            } catch (err) {
                if (err instanceof Error) {
                    setError(err);
                }
            }
        }
        fetchUserRsvp();
    }, [eventId])

    const putRsvp = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("User token not found");
            }

            await sendRsvp(token, rsvp, eventId);

        } catch (err) {
            if (err instanceof Error) {
                setError(err);
            }
        } finally {
            setError(null)
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRsvp(e.target.value);
    };

    return (
        <form onSubmit={putRsvp}>
            <label>RSVP?</label>
            <select onChange={handleChange} value={rsvp}>
                <option value="">Choose Rsvp</option>
                {RSVP_VALUES.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <button
                type="submit"
            >
                Submit
            </button>
            {error && <div className="text-red-600">{error.message}</div>}
        </form>
    );
}