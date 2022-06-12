import Events from "../../models/events.js";
import Users from "../../models/users.js";
import { sendError } from "../../utils/sendError.js";

const mapFunction = async (eventArray) => {
  return await eventArray.map(async (event) => await mapEvent(event));
};

const mapEvent = async (event) => {
  // currUser.createdEvents.map(async (event) => {
  let currEvent = await Events.findById(event.eventId);

  return {
    eventName: currEvent.eventName,
    createdBy: currEvent.createdByUser,
    dateCreated: currEvent.dateCreated,
  };
};

export const aboutUser = async (req, res) => {
  try {
    const { token } = req.headers;

    const currUser = await Users.findOne({ jwtToken: token });
    if (!currUser) {
      sendError(res, "Authentication Failed (Please log-in again)", 400);
    }

    const createdEvents = await mapFunction(currUser.createdEvents);
    let a = await currUser.createdEvents.map(async (event) =>
      createdEvents.push(await mapEvent(event))
    );

    const invitedForEvents = [];
    let b = await currUser.invitedForEvents.map(async (event) => {
      // currUser.invitedForEvents.map(async (event) => {
      let currEvent = await Events.findById(event.eventId);

      invitedForEvents.push({
        eventName: currEvent.eventName,
        createdBy: currEvent.createdByUser,
        dateCreated: currEvent.dateCreated,
      });
    });

    // const resolved = await Promise.all([a, b]);
    // console.log("\n\n", resolved, createdEvents, invitedForEvents);
    console.log(createdEvents, invitedForEvents);

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
