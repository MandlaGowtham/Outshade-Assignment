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

    const myPromisesFunction = async () => {
      try {
        const promiseOne = new Promise((resolve, reject) => {
          setTimeout(() => {
            let createdEventsList = currUser.createdEvents.map(
              async (event) => {
                let currEvent = await Events.findById(event.eventId);
                return {
                  eventName: currEvent.eventName,
                  eventDescription: currEvent.eventDescription,
                  createdBy: currEvent.createdByUser,
                  dateCreated: currEvent.dateCreated,
                };
              }
            );
            resolve(createdEventsList);
          }, 2000);
        });

        const promiseTwo = new Promise((resolve, reject) => {
          setTimeout(() => {
            let invitedForEventsList = currUser.invitedForEvents.map(
              async (event) => {
                let currEvent = await Events.findById(event.eventId);
                return {
                  eventName: currEvent.eventName,
                  eventDescription: currEvent.eventDescription,
                  createdBy: currEvent.createdByUser,
                  dateCreated: currEvent.dateCreated,
                };
              }
            );
            resolve(invitedForEventsList);
          }, 2000);
        });

        let createdEvents = [];
        let invitedForEvents = [];

        promiseOne.then((val) => {
          // console.log(val);
          createdEvents = val;
        });
        promiseTwo.then((val) => {
          // console.log(val);
          invitedForEvents = val;
        });

        await Promise.all([promiseOne, promiseTwo])
          .then((values) => {
            // console.log(values);

            res.status(200).json({
              success: true,
              message: "User details",
              data: {
                Name: currUser.name,
                createdEvents,
                invitedForEvents,
              },
            });
          })
          .catch((error) => {
            console.error(error.message);
          });
      } catch (error) {
        console.log(error.message);
        res.send(error.message);
      }
    };

    myPromisesFunction();
  } catch (error) {
    res.send("An error occured");
    console.log(error.message);
  }
};
