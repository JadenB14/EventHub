import api from "./api";
import EventType from "../../types/event.ts";

export const getAllEvents = async (): Promise<Event[]> => {
    const response = await api.get("/api/events");
    return response.data;
}

export const getEventById = async (id: string): Promise<EventType> => {
    const response = await api.get(`/api/events/${id}`);
    return response.data;
}

export const getEventByUser = async (id: string | null) => {
    const response = await api.get(`/api/users/${id}/events`);
    return response.data;
}

export const createEvent = async (eventData: EventType, token: string) => {
    const response = await api.post("/api/events/", eventData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}