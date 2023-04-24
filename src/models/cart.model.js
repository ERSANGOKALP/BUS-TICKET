const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  cartId:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    unique:true
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
  route:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  }  
},{
    timestamps:true
});

module.exports = mongoose.model('Cart', cartSchema);