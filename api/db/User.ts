import { Schema, model } from "mongoose"

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  accessToken: { type: String, required: true },
  upi: { type: String, required: true, unique: true },
  eventList: { type: Array, required: true },
  totalStamps: { type: Number, required: false}
})

const User = model("User", userSchema, "Users")

export default User
