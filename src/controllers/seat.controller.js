const Seat =require("../models/seat.model.js")

const getSeats = async (req,res) => {
    
    try {
        const seats = await Seat.find({})
        res.status(200).json(seats);
    } catch (err) {
        res.status(500).json(err);
    }    
}

module.exports = {
    getSeats,
}