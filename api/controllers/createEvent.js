import Events from "../../models/events.js";
import Users from "../../models/users.js";
import { sendError } from "../../utils/sendError.js";

export const createEvent = async (req, res) => {
  try {
    const { token } = req.headers;
    const { eventName, eventDescription } = req.body;

    const currUser = await Users.findOne({ jwtToken: token });
    if (!currUser) {
      return sendError(
        res,
        "Authentication Failed (You haven't logged-in)",
        400
      );
    }

    const newEvent = new Events({
      eventName,
      eventDescription,
      createdByUser: currUser._id,
    });
    await newEvent.save();

    Users.findOneAndUpdate(
      { _id: currUser._id },
      { $push: { createdEvents: { eventId: newEvent._id, eventName } } }
    ).exec();
    // await currUser.save();

    res.status(200).json({
      success: true,
      message: "A new event created",
    });
  } catch (error) {
    console.log(error.message);
  }
};
