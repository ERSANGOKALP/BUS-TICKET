const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId,        
    },
    from: {
        type: String,
        required: true
      },
      to: {
        type: String,
        required: true
      },
      departureDate: {
        type: Date,
        required: true
      },
      price:{
        type:Number,
        required:true
      },
      emptySeats:{
        type:Boolean, 
        required:true       
      },
      fullSeats:{
        type:Boolean, 
        required:true
      }

},{
    timestamps:true
})

module.exports = mongoose.model("Trip" , tripSchema)