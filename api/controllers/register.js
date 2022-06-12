import bcrypt from "bcrypt";
import Users from "../../models/users.js";
import { sendError } from "../../utils/sendError.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let isEmailFound = await Users.findOne({ email });
    if (isEmailFound) {
      return sendError(res, "User already registered");
    }

    var newUser = new Users({
      name,
      email,
      password: await bcrypt.hash(password, 12),
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Added a New User",
      newUserId: newUser._id,
    });
  } catch (error) {
    res.send("An error occured");
    console.log(error.message);
  }
};
