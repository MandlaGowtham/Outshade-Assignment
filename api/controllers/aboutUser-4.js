import Events from "../../models/events.js";
import Users from "../../models/users.js";
import { sendError } from "../../utils/sendError.js";

export const aboutUser = async (req, res) => {
  try {
    const { token } = req.headers;

    const currUser = await Users.findOne({ jwtToken: token });
    if (!currUser) {
      sendError(res, "Authentication Failed (Please log-in again)", 400);
    }

    let createdEvents = currUser.createdEvents.map(async (event) => {
      let currEvent = await Events.findById(event.eventId);

      return {
        eventName: currEvent.eventName,
        createdBy: currEvent.createdByUser,
        dateCreated: currEvent.dateCreated,
      };
    });
    createdEvents = await Promise.all(createdEvents);

    let invitedForEvents = currUser.invitedForEvents.map(async (event) => {
      let currEvent = await Events.findById(event.eventId);

      return {
        eventName: currEvent.eventName,
        createdBy: currEvent.createdByUser,
        dateCreated: currEvent.dateCreated,
      };
    });
    invitedForEvents = await Promise.all(invitedForEvents);

    // await Promise.all([...createdEvents, ...invitedForEvents]);

    // console.log(createdEvents, invitedForEvents);

    res.status(200).json({
      success: true,
      message: "User details",
      data: {
        Name: currUser.name,
        createdEvents,
        invitedForEvents,
      },
    });
  } catch (error) {
    res.send("An error occured");
    console.log(error.message);
  }
};
