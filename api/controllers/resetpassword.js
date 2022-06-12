import crypto from "crypto";

import Token from "../../models/token.js";
import Users from "../../models/users.js";

export const resetpassword = async (req, res) => {
  try {
    const { email } = req.body;

    const currUser = await Users.findOne({ email });
    if (!currUser) {
      return res.status(400).send("User with given email doesn't exist");
    }

    let currToken = await Token.findOne({ userId: currUser._id });
    if (!currToken) {
      currToken = await new Token({
        userId: currUser._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }

    const link = `${process.env.BASE_URL}/user/updatepassword/${currUser._id}/${currToken.token}`;

    res.status(200).json({
      success: true,
      message: "Password reset link",
      data: {
        "Reset Link": link,
      },
    });
  } catch (error) {
    res.send("An error occured");
    console.log(error.message);
  }
};
