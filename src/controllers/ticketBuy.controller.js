const Ticket = require("../models/ticketBuy.model");
const Trip = require("../models/trip.model");
const Booking = require("../models/booking.model");

const getTickets = async (req,res) => {
    const {userId} = req.params.userId
    try {        
        const tickets = await Ticket.find({ userId }).populate('trip');
        res.status(200).json(tickets);
      } catch (error) {
        console.error(err);
        res.status(500).json(err);
      }
}

const getTicketDetails = (req,res) => {
    const {ticketId} = req.params.ticketId
  try {
    const ticketDetail = Ticket.find(ticketId).populate('trip','booking');
    const details = ticketDetail.map((ticket) => {
      return {
        from: ticket.trip.from,
        to: ticket.trip.to,
        time: ticket.trip.time,
        seatNumber: ticket.booking.seatNumber
      };
    res.status(200).json(ticketDetail)
  })} catch (err) {
    res.status(500).json(err);
  }

}

module.exports = {
    getTickets,
    getTicketDetails  
  }