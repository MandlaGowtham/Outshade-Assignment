import Events from "../../models/events.js";
import Users from "../../models/users.js";
import { sendError } from "../../utils/sendError.js";

export const eventDetails = async (req, res) => {
  try {
    const { token } = req.headers;
    const { eventName } = req.body;

    const currUser = await Users.findOne({ jwtToken: token });
    if (!currUser) {
      return sendError(res, "Authentication Failed (Please log-in again)", 400);
    }

    const currEvent = await Events.findOne({
      eventName,
      createdByUser: currUser._id,
    });
    if (!currEvent) {
      return sendError(res, `No event with following name found`, 400);
    }

    res.status(200).json({
      success: true,
      message: "Event details",
      data: {
        "Event Name": currEvent.eventName,
        "Created By User": currEvent.createdByUser,
        "Users Invited": currEvent.usersInvited,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};
