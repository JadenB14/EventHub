import api from "./api";

interface EventData {
    id: string,
    title: string;
    createdAt: string;
    location: string;
    description?: string;
    author?: {
        name: string
    } 
};

export const getAllEvents = async (): Promise<Event[]> => {
    const response = await api.get("/api/events");
    return response.data;
}

export const getEventById = async (id: string) => {
    const response = await api.get(`/api/event/${id}`);
    return response.data;
}

export const getEventByUser = async (id: string | null) => {
    const response = await api.get(`/api/users/${id}/events`);
    return response.data;
}

export const createEvent = async (eventData: EventData) => {
    const response = await api.post("/events", eventData);
    return response.data;
}