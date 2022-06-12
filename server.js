import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./routes.js";

dotenv.config();

const PORT = process.env.PORT;
const mongodb_url = process.env.MONGODB_URL;

mongoose
  .connect(mongodb_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to mongodb");

    const app = express();
    app.use(express.json());
    app.use(cors({ origin: true }));
    app.use(express.urlencoded({ extended: true }));

    routes(app);

    app.listen(PORT, () => {
      console.log(`Server Running on Port:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`${error} did not connect`);
  });
