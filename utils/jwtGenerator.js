import jwt from "jsonwebtoken";

export const jwtTokenGenerator = (id) => {
  let data = {
    time: Date.now(),
    id,
  };
  const JWTToken = jwt.sign(data, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  return JWTToken;
};
