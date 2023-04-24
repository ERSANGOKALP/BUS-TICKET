const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
    busId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bus',
     required:true
    },    
    seatNumber: [{
      type: Number,
      required: true,     
    }],    
    passangerName:{
      type:String,
      required:true
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      required: true,      
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',      
    }    
  },{
    timestamps:true
  });
  
  module.exports= mongoose.model('Seat', seatSchema);
  