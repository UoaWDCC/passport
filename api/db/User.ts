import { Schema, model } from "mongoose"

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  accessToken: String,
  upi: String,
})

const User = model("User", userSchema, "Users")

export default User
