import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

dotenv.config();

app.get("/", (request, response) => {
  response.status(200).send("Server is live");
});

app.use("/todos", todoRoutes);

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then((reposne) => {
    console.log("DB connected successfully!!");
    app.listen(process.env.PORT_NO, () => {
      console.log(`app listens to port ${process.env.PORT_NO}`);
    });
  })
  .catch((error) => console.log(error));
