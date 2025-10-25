import EventType, { EventObject } from "./event"

export default interface RsvpType {
    id: string;
    event: EventType[];
    status: any;
    createdAt: string;
}

export const RsvpObject = {
    id: "",
    event: [EventObject],
    status: "",
    createdAt: "",
}