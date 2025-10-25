export default interface EventType {
    id: string;
    title: string;
    location: string;
    date: string;
    createdAt: string;
    description?: string;
    author?: {
        name?: string;
    }
}

export const EventObject = {
    id: "",
    title: "",
    location: "",
    createdAt: "",
    description: "",
    date: ""
}