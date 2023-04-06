const Booking = require("../models/booking.model");
const Seat = require("../models/seat.model");

const trips = async (req,res) => {
  const { from, to } = req.params;
  try {
    const trips = await Booking.find(
      { from: from, to: to },
      { time: 1, from: 1, to: 1, price: 1, _id: 0 }
    );
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve trips' });
  }
}

const isAdjacentSeatEmpty = async (seatNumber, tripId, gender) => {
  // find the seat object with the given seat number
  const seat = await Seat.findOne({ trip: tripId, number: seatNumber });

  // if the seat is not found or already occupied, return false
  if (!seat || seat.isOccupied) {
    return false;
  }

  // if the seat is already assigned to a passenger with the same gender, return true
  if (seat.gender === gender) {
    return true;
  }

  // check if the adjacent seat is empty and has a different gender than the passenger
  const adjacentSeatNumber = (seatNumber % 2 === 0) ? seatNumber - 1 : seatNumber + 1;
  const adjacentSeat = await Seat.findOne({ trip: tripId, number: adjacentSeatNumber });

  if (!adjacentSeat || adjacentSeat.isOccupied || adjacentSeat.gender === gender) {
    return false;
  }

  return true;
};

  const addBooking = async (req, res) => {
  const { tripId, seats, gender } = req.body;

  if (seats.length > 5) {
    return res.status(400).send({ message: 'You can book a maximum of 5 seats at once.' });
  }

  const isAdjacentSeatsEmpty = seats.every((seatNumber) => {
    return isAdjacentSeatEmpty(seatNumber, tripId, gender);
  });

  if (!isAdjacentSeatsEmpty) {
    return res.status(400).send({ message: 'Adjacent seats are not available.' });
  }

  const bookings = seats.map((seatNumber) => {
    return {
      trip: tripId,
      seat: seatNumber,
      gender: gender
    };
  });

  try {
    const savedBookings = await Booking.create(bookings);
    await Seat.updateMany({ trip: tripId, number: { $in: seats } }, { isOccupied: true, gender: gender });

    return res.status(201).send(savedBookings);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};




module.exports = {
  trips,  
  addBooking,
}








module.exports = {
  trips,
}