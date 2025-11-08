import EventType, { EventObject } from "./event";

export default interface CommentType {
    id: string;
    event: EventType;
    content: string;
    createdAt: string;
    author?: {
        name: string;
    }
}

export const CommentObject = {
    "id": "",
    "event": EventObject,
    "content": "",
    "createdAt": "",
}