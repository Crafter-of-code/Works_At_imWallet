import requiredFlightData from "../../db/requiredFlightData.js";
export function getFlightInfoController(req, res) {
  const body = req.body;
  console.log(body);
  const result = requiredFlightData.filter(
    (item) =>
      item.Origin === body.from.code && item.Destination === body.to.code
  );
  if (result.length == 0) {
    return res.status(200).json({
      status: true,
      message: "fetched data successfully",
      data: result,
    });
  } else {
    return res
      .status(200)
      .json({
        status: true,
        message: "fetched data successfully",
        data: result,
      });
  }
}
export function flightBookingController(req, res) {
  console.log(req.body);
  return res
    .status(200)
    .json({ status: false, message: "flight book successfully" });
}
