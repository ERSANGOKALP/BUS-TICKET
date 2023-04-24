const mongoose = require("mongoose");

const busSchema = mongoose.Schema({ 
    brand:{
        type:String,
        required:true
    },
    plate:{
        type:String,
        required:true,
        unique:true,
        max:7
    },
    routes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Route"        
      }],
    totalSeats:{
        type:Number,
        required:true
    },
    seats:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Seat",        
    }]    
},{
    timestamps:true,       
});

module.exports = mongoose.model("Bus" , busSchema);