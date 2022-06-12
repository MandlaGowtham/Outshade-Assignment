import mongoose from "mongoose";

const createdEventsSchema = mongoose.Schema({});

const UserSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  jwtToken: {
    type: String,
    default: null,
  },
  createdEvents: [
    {
      eventId: {
        type: mongoose.Types.ObjectId,
        ref: "Events",
      },
      eventName: {
        type: String,
      },
    },
  ],
  invitedForEvents: [
    {
      eventId: {
        type: mongoose.Types.ObjectId,
        ref: "Events",
      },
      eventName: {
        type: String,
      },
    },
  ],
});

export default mongoose.model("Users", UserSchema);
