import { Schema, model } from "mongoose"

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  accessToken: { type: String, required: true },
  upi: { type: String, required: true, unique: true },
  eventList: { type: Array, required: true, default : [] },
  totalStamps: { type: Number, required: true, default: 0 },
  stampsLeft: { type: Number, required: true, default: 3 },
  prizesAchieved: { type: Number, required: true, default: 0 }
})

const User = model("User", userSchema, "Users")

export default User