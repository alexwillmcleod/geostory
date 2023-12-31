import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import { router as storyRouter } from "./routes/story";
import { router as userRouter } from "./routes/user";
import bodyParser from "body-parser";
import cors from "cors";

config(); // Import environment variables from config

const databaseUrl = process.env.DATABASE_URL!;

mongoose.connect(databaseUrl);

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", async (req, res) => {
  return res.status(200).send("Hello, World!");
});

app.use("/story", storyRouter);
app.use("/user", userRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
