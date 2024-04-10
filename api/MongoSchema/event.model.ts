import mongoose from "mongoose"
import { object } from "zod";


const eventsSchema = new mongoose.Schema({
    eventName: {
        type: String, 
        required: true},
    eventImage: {
        type: String, 
        require: true}
})

export default mongoose.model('event', eventsSchema)
