import { Schema, model } from "mongoose"

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  accessToken: { type: String, required: true },
  upi: { type: String, required: true, unique: true },
  eventList: { type: Array, required: true, default : [] },
})

userSchema.virtual('totalStamps')
  .get(function() {
  return this.eventList.length; 
  });

  userSchema.virtual('stampsLeft')
  .get(function() {
    if (this.eventList.length % 5 === 0 && this.eventList.length !== 0) {
      return 0;
    } else {
      return 5 - (this.eventList.length % 5);
    }
  });

userSchema.virtual('prizesAchieved')
  .get(function() {
  return Math.floor(this.eventList.length / 5)
});

userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

const User = model("User", userSchema, "Users")

export default User