import mongoose from "mongoose";

const EventSchema = mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventDescription: {
    type: String,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  createdByUser: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  usersInvited: [
    {
      // type: mongoose.Types.ObjectId,
      // ref: "Users",
      type: String, // email
      // unique: true,
    },
  ],
});

export default mongoose.model("Events", EventSchema);
