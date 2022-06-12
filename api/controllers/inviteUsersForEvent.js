import Events from "../../models/events.js";
import Users from "../../models/users.js";
import { sendError } from "../../utils/sendError.js";

export const inviteUsersForEvent = async (req, res) => {
  try {
    const { token } = req.headers;
    const { eventName, invitedEmails } = req.body;

    const currUser = await Users.findOne({ jwtToken: token });
    if (!currUser) {
      return sendError(res, "Authentication Failed (Please log-in again)", 401);
    }

    const currEvent = await Events.findOne({
      eventName,
      createdByUser: currUser._id,
    });
    if (!currEvent) {
      return sendError(res, "No event found with the following name", 400);
    }

    invitedEmails.map((email) => {
      currEvent.usersInvited.push(email);
      Users.findOneAndUpdate(
        { email },
        { $push: { invitedForEvents: { eventId: currEvent._id, eventName } } }
      ).exec();
    });
    await currEvent.save();
    // currEvent.usersInvited.concat(invitedEmails);
    // await currEvent.save();

    res.status(200).json({
      success: true,
      message: "Successfully invited all users",
    });
  } catch (error) {
    res.send("An error occured");
    console.log(error.message);
  }
};
