import router from "./api/controllers/router.js";

export default function routes(app) {
  app.use("/user", router);
}
