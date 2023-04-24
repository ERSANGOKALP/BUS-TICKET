const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./src/routes/auth.router.js")
const userRoute = require("./src/routes/user.router.js")
const busRoute = require("./src/routes/bus.router.js")
const bookingRoute = require("./src/routes/booking.router.js")
const tripRoute = require("./src/routes/route.router.js")
const seatRoute = require("./src/routes/seat.router.js")
const routesRoute = require("./src/routes/route.router.js")
const User = require("./src/models/user.model.js")
const Booking = require("./src/models/booking.model.js")
const Seat = require("./src/models/seat.model.js")


const app = express();
dotenv.config();


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL,{
          useNewUrlParser: true,  
          useUnifiedTopology: true          
        });       
        console.log(`Connected to MongoDB!`);       
    } catch (err) {
       console.log(err) 
    }
};  


//MIDDLEWARES
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/buses" , busRoute)
app.use("/api/bookings" , bookingRoute)
app.use("/api/routes" , routesRoute)
app.use("/api/seats" , seatRoute)

//ERROR HANDLİNG MIDDLEWARE
app.use((err,req,res,next) =>{
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!"
  return res.status(errorStatus).json({
    success:false,
    status:errorStatus,
    messega:errorMessage,
    stack:err.stack
  });  
});

// Sefer olmayan şehirler arasında istek yapıldığında hata döndür
app.use((req, res, next) => {
  res.status(404).json({ message: 'No such trip found' });
});

app.listen(process.env.PORT , ()=>{
    connect();
    console.log(`Server is running on port ${process.env.PORT}`)
})

