import express from "express";

import { login } from "./login.js";
import { logout } from "./logout.js";
import { register } from "./register.js";
import { changepassword } from "./changepassword.js";
import { resetpassword } from "./resetpassword.js";
import { aboutUser } from "./aboutUser-4.js";
import { createEvent } from "./createEvent.js";
import { eventDetails } from "./eventDetails.js";
import { inviteUsersForEvent } from "./inviteUsersForEvent.js";
import { authentication } from "../middleware/authentication.js";
import { updatePassword } from "./updatepassword.js";

export default express
  .Router()
  .post("/register", register)
  .post("/login", login)
  .post("/logout", logout)

  .get("/aboutuser", authentication, aboutUser)

  .post("/resetpassword", resetpassword)
  .post("/updatepassword/:userId/:token", updatePassword)

  .post("/changepassword", authentication, changepassword)

  .post("/createevent", authentication, createEvent)
  .post("/inviteusers", authentication, inviteUsersForEvent)

  .get("/aboutuser", authentication, aboutUser)
  .post("/eventdetails", authentication, eventDetails);
