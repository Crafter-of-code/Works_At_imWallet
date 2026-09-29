import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import { connectDatabase } from "./db/connectin.db.js";
import bookingRouter from "./routes/booking.route.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
  const data = {
    status: true,
    message: "working properly",
  };
  res.json(data);
});
app.use(authRoute);
app.use("/api", bookingRouter);

connectDatabase();
export default app;
