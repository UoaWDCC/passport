import { Schema, model } from "mongoose";

const EventsSchema = new Schema({
    eventName: { type: String, req: true },
    stamp64: { type: String, req: true },
    startDate: { type: Date, req: true },
    endDate: { type: Date, req: true },
    eventVenue: { type: String, req: true },
    eventDescription: { type: String, req: true },
    totalAttended: { type: Number, default: 0, req: true },
    QRcode: { type: String, req: true },
});

const Events = model("Event", EventsSchema, "Events");

export default Events;
