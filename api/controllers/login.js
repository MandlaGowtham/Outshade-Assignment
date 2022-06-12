import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Users from "../../models/users.js";
import { jwtTokenGenerator } from "../../utils/jwtGenerator.js";
import { sendError } from "../../utils/sendError.js";

export const login = async (req, res) => {
  try {
    const { token } = req.headers;

    if (token) {
      const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);

      if (verified) {
        let isUserFound = await Users.findOne({ jwtToken: token });
        if (isUserFound) {
          return sendError(res, "You are already logged-in", 400);
        }
      }
    }

    const { email, password } = req.body;

    let currUser = await Users.findOne({ email });
    if (!currUser) {
      return sendError(res, "Incorrect email or password!", 400);
    }

    let isMatched = await bcrypt.compareSync(password, currUser.password);
    if (!isMatched) {
      return sendError(res, "Incorrect email or password!", 400);
    }

    const generatedJwtToken = jwtTokenGenerator(currUser._id);

    currUser.jwtToken = generatedJwtToken;
    await currUser.save();

    res.status(200).json({
      success: true,
      message: "Logged-in Successfully",
      jwtToken: generatedJwtToken,
    });
  } catch (error) {
    res.send("An error occured");
    console.log(error.message);
  }
};
