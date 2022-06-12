import bcrypt from "bcrypt";

import Users from "../../models/users.js";
import { sendError } from "../../utils/sendError.js";

export const changepassword = async (req, res) => {
  try {
    const { token } = req.headers;
    const { newPassword } = req.body;

    let currUser = await Users.findOne({ jwtToken: token });

    if (!currUser) {
      return sendError(res, "Authentication Failed (Please log-in again)", 401);
    }

    currUser.password = await bcrypt.hash(newPassword, 12);
    await currUser.save();

    // Users.findOneAndUpdate(
    //   { jwtToken: token },
    //   { password: newPassword }
    // ).exec();

    res.status(200).json({
      success: true,
      message: "Successfully changed password",
    });
  } catch (error) {
    res.send("An error occured");
    console.log(error.message);
  }
};
