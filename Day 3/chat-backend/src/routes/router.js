import express from "express";

const router = express.Router();

router.get("/online", (req, res) => {
  res.json({
    success: true,
    message: "Online users",
  });
});

export default router;
