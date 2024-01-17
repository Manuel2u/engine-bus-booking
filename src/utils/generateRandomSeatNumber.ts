import createError from "./error";

function generateRandomSeatNumber(bus: any, slots: any): number {
  const availableSlots = bus.numberOfSeats - slots.length;
  if (availableSlots <= 0) {
    throw createError("Bus is full", 400);
  }

  // Generate a random seat number within the available range
  const randomSeatNumber = Math.floor(Math.random() * availableSlots) + 1;
  return randomSeatNumber;
}
export default generateRandomSeatNumber;
