import { Schema, model } from "mongoose"

const EventsSchema = new Schema({
   eventName: {type: String},
   stamp64: {type: String},
   startDate:{type:Date},
   endDate: {type: Date},
   totalAttended: {type: Number, default: 0, req:true},
   QRcode: {type: String}
})

const Events = model("Event", EventsSchema, "Events1")

export default Events
