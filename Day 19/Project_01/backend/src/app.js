import express, { urlencoded } from "express";
import authRouter from "./routes/auth.route.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  console.log("we got your request");
  res.status(200).json({
    status: true,
    message: `server is running on port`,
  });
});
app.use("/api/auth", authRouter);
export default app;
