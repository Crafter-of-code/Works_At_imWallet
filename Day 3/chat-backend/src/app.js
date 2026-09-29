import { configDotenv } from "dotenv";

configDotenv();

import express from "express";
import cors from "cors";

import router from "./Routes/router.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Chat server is running",
  });
});

app.use("/chat", router);

export default app;
