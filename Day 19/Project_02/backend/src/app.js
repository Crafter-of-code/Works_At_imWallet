import e from "express";
import authRouter from "./routes/auth.route.js";
import flightRoute from "./routes/flight.route.js";
const app = e();
app.use(e.json());
app.use(e.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log(req.headers.authorization);
  res.status(200).json({
    status: true,
    message: "server is running properly",
  });
});
app.use("/api", authRouter);
app.use("/api", flightRoute);
export default app;
