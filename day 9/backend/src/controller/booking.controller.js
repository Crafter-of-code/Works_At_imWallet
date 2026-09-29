export function flightBookingController(req, res) {
  console.log(req);
  const resposne = {
    status: true,
    message: "flight booked successfully",
  };
  res.status(200).json(resposne);
}
export function busBookingController() {
  console.log(req);
  const resposne = {
    status: true,
    message: "bus booked successfully",
  };
  res.status(200).json(resposne);
}
export function hotelBookingController() {
  console.log(req);
  const resposne = {
    status: true,
    message: "hotel booked successfully",
  };
  res.status(200).json(resposne);
}
