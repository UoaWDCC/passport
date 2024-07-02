import { Schema, model } from "mongoose"

const prizeSchema = new Schema({
  userId: String,
  redeemed: Boolean,
  redeemedTime: Date,
  firstName: String,
  lastName: String,
})

const Prize = model("Prize", prizeSchema, "Prizes")

export default Prize
