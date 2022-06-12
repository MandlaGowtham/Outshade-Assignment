import jwt from "jsonwebtoken";

import { sendError } from "../../utils/sendError.js";

export const authentication = (req, res, next) => {
  try {
    const { token } = req.headers;

    if (token) {
      const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);

      if (isVerified) {
        next();
        // let isUserFound = await Users.findOne({ jwtToken: token });

        // if (!isUserFound) {
        //   return sendError(res, "Authentication Failed (user not found) (You haven't logged-in)", 401);
        // }
        // else next();
      } else {
        return sendError(
          res,
          "Authentication Failed (token verification failed)",
          401
        );
      }
    } else {
      return sendError(res, "Authentication Failed (No token provided)", 401);
    }
  } catch (error) {
    return res.status(401).send(error);
  }
};
