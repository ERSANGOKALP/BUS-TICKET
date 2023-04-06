const mongoose = require('mongoose');

const ticketBuySchema = new mongoose.Schema({
  ticketId:{
    type: mongoose.Schema.Types.ObjectId,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  trip:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['Confirmed'],    
  }
},{
    timestamps:true
});

module.exports = mongoose.model('Ticket', ticketBuySchema);