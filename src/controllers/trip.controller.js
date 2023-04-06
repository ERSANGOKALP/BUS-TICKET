const Trip = require("../models/trip.model")
const Seat = require("../models/seat.model")

const getTripDetail = async (req,res) => {
    const tripId = req.params.id;
    try {
      // Sefer bilgilerini al
      const trip = await Trip.findById(tripId);
  
      // Koltuk bilgilerini al
      const seats = await Seat.find({ trip: tripId });
  
      // Koltukları dolu/boş ve cinsiyet bilgileriyle birlikte ayır
      const emptySeats = [];
      const fullSeats = [];
      seats.forEach((seat) => {
        if (seat.isOccupied) {
          fullSeats.push({
            number: seat.number,
            gender: seat.gender,
            passenger: seat.passenger
          });
        } else {
          emptySeats.push(seat.number);
        }
      });
  
      // Response olarak seferin tüm bilgilerini döndür
      res.json({
        id: trip.id,
        from: trip.from,
        to: trip.to,        
        departureDate: trip.departureDate,        
        price: trip.price,
        emptySeats: emptySeats,
        fullSeats: fullSeats
      });
    } catch (error) {   
      res.status(500).json({ message: 'Failed to retrieve trip details' });
    }
  }

  module.exports = {
    getTripDetail,
  }