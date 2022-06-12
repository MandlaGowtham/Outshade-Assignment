import bcrypt from "bcrypt";

import Users from "../../models/users.js";
import Token from "../../models/token.js";

import { sendError } from "../../utils/sendError.js";

export const updatePassword = async (req, res) => {
  try {
    const { userId, token } = req.params;
    const { newPassword } = req.body;

    const currUser = await Users.findById(userId);
    if (!currUser) return sendError(res, "Invalid link or expired", 400);

    const currToken = await Token.findOne({
      userId: currUser._id,
      token: token,
    });
    if (!currToken) return sendError(res, "Invalid link or expired", 400);

    currUser.password = await bcrypt.hash(newPassword, 12);
    await currUser.save();
    await currToken.delete();

    res.status(200).json({
      success: true,
      message: "password reset sucessfully.",
    });
  } catch (error) {
    res.send("An error occured");
    console.log(error.message);
  }
};
