const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
      required: true
    },
    number: {
      type: Number,
      required: true
    },
    isOccupied: {
      type: Boolean,
      default: false
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      required: true
    },
    passenger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    isAdjacentOccupied: {
      type: Boolean,
      default: false
    }
  },{
    timestamps:true
  });
  
  module.exports= mongoose.model('Seat', seatSchema);
  