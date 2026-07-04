import CommentType from "./comment";

export default interface EventType {
    id: string;
    title: string;
    location: string;
    dateOf: string;
    createdAt: string;
    description?: string;
    comments?: CommentType[];
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
    dateOf: "",
}