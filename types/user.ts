import EventType, { EventObject } from "./event";
import { RsvpObject } from "./rsvp";

export default interface UserType {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    events?: EventType[];
    rsvps: { event: EventType }[];
}

export const UserObject = {
    id: "",
    name: "",
    email: "",
    createdAt: "",
    events: [EventObject] ,
    rsvps: RsvpObject
}