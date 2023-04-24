const mongoose = require('mongoose');

const routesSchema = new mongoose.Schema({   
    bus:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Bus"
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
},{
    timestamps:true
})

module.exports = mongoose.model("Route" , routesSchema)