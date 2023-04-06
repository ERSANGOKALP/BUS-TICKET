const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },  
  seatNumber: {
    type: Number,
    required: true
  },
  destination: {
    from: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    }
  },
  price:{
    type:Number,
    required:true
  },
  departureDate: {
    type: Date,
    required: true
  }  
},{
  timestamps:true
});

module.exports = mongoose.model('Booking', bookingSchema);