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

    // currUser.createdEvents.map(async (event) => {
    //   let currEvent = await Events.findById(event.eventId);

    //   createdEvents.push({
    //     eventName: currEvent.eventName,
    //     eventDescription: currEvent.eventDescription,
    //     createdBy: currEvent.createdByUser,
    //     dateCreated: currEvent.dateCreated,
    //   });
    // });
    const _invitedForEvents = await new Promise((resolve, reject) => {
      setTimeout(async () => {
        let invitedForEvents = [];

        await new Promise((resolve, reject) => {
          setTimeout(async () => {
            // console.log(currUser.invitedForEvents);
            currUser.invitedForEvents.map(async (event) => {
              let currEvent = await Events.findById(event.eventId);
              // console.log(currEvent);
              invitedForEvents.push({
                eventName: currEvent.eventName,
                eventDescription: currEvent.eventDescription,
                createdBy: currEvent.createdByUser,
                dateCreated: currEvent.dateCreated,
              });
              // console.log(invitedForEvents);
            });
            resolve([]);
          }, 5000);
        });

        console.log(invitedForEvents);

        resolve(invitedForEvents);
      }, 5000);
    });

    // const _createdEvents = await new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     let createdEvents = [];
    //     currUser.createdEvents.map(async (event) => {
    //       let currEvent = await Events.findById(event.eventId);

    //       createdEvents.push({
    //         eventName: currEvent.eventName,
    //         eventDescription: currEvent.eventDescription,
    //         createdBy: currEvent.createdByUser,
    //         dateCreated: currEvent.dateCreated,
    //       });
    //     });
    //     resolve(createdEvents);
    //   }, 2000);
    // });

    // let createdEvents = [];
    // let invitedForEvents = [];

    // promiseOne.then((currEvent) => {
    //   invitedForEvents.push({
    //     eventName: currEvent.eventName,
    //     eventDescription: currEvent.eventDescription,
    //     createdBy: currEvent.createdByUser,
    //     dateCreated: currEvent.dateCreated,
    //   });
    // });
    // promiseTwo.then((currEvent) => {
    //   createdEvents.push({
    //     eventName: currEvent.eventName,
    //     eventDescription: currEvent.eventDescription,
    //     createdBy: currEvent.createdByUser,
    //     dateCreated: currEvent.dateCreated,
    //   });
    // });

    // let b = await currUser.invitedForEvents.map(async (event) => {
    // currUser.invitedForEvents.map(async (event) => {
    //   let currEvent = await Events.findById(event.eventId);

    //   invitedForEvents.push({
    //     eventName: currEvent.eventName,
    //     createdBy: currEvent.createdByUser,
    //     dateCreated: currEvent.dateCreated,
    //   });
    // });

    // const resolved = await Promise.all([a, b]);
    // console.log("\n\n", resolved, createdEvents, invitedForEvents);
    console.log(_invitedForEvents);

    res.status(200).json({
      success: true,
      message: "User details",
      data: {
        Name: currUser.name,
        // _createdEvents,
        _invitedForEvents,
      },
    });
  } catch (error) {
    res.send("An error occured");
    console.log(error.message);
  }
};
