const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  id:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    unique:true
  },
  userName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },  
  routeId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Route',
    required:true,
  },  
  totalprice:{
    type:Number,
    required:true
  }  
},{
  timestamps:true
});

module.exports = mongoose.model('Booking', bookingSchema);