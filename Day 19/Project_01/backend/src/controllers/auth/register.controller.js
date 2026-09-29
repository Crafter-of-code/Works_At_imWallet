function registerController(req, res) {
  console.log(req);
  res
    .status(200)
    .json({ status: true, message: "register working successfully" });
}
export default registerController;
