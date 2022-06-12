import jwt from "jsonwebtoken";

import Users from "../../models/users.js";
import { sendError } from "../../utils/sendError.js";

export const logout = async (req, res) => {
  try {
    const { token } = req.headers;

    // console.log(token);

    if (!token) {
      return sendError(res, "Error Occured (No JWT Token provided)", 400);
    }

    const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (isVerified) {
      let isUserFound = await Users.findOne({ jwtToken: token });

      if (!isUserFound) {
        return sendError(
          res,
          "You haven't logged-in (user not found) (Please do Login)",
          400
        );
      }

      isUserFound.jwtToken = null;
      isUserFound.save();
    }

    res.status(200).json({
      success: true,
      message: "Logged-out Successfully",
    });
  } catch (error) {
    res.send("An error occured");
    console.log(error.message);
  }
};
