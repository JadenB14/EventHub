import api from "./api"
import RsvpType from "../../types/rsvp"

export const sendRsvp = async (token: string, status: string, eventId: string): Promise<RsvpType> => {
    const response = await api.post("/api/rsvps/", {
        "status": status,
        "eventId": eventId
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data;
}

export const getUserRsvpForEvent = async (token: string, eventId: string): Promise<RsvpType> => {
    const response = await api.get(`/api/rsvps/event/${eventId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data;
} 

export const getUserRsvps = async (token: string): Promise<RsvpType[]> => {
    const response = await api.get(`/api/rsvps/user/`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data;
}