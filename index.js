const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./src/routes/auth.router.js")
const userRoute = require("./src/routes/user.router.js")
const bookingRoute = require("./src/routes/booking.router.js")
const tripRoute = require("./src/routes/trip.router.js")
const seatRoute = require("./src/routes/seat.router.js")
const ticketRoute = require("./src/routes/ticketBuy.router.js")
const User = require("./src/models/user.model.js")
const Booking = require("./src/models/booking.model.js")
const Seat = require("./src/models/seat.model.js")


const app = express();
dotenv.config();


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL,{
           useNewUrlParser: true 
        });
        console.log(`Connected to MongoDB!`);
       
    } catch (err) {
       console.log(err) 
    }
}

const user = new User({
  username: 'John Doe',
    age: 30,
    gender: 'Male',
    email: 'johndoe@example.com',
    telephone: '555-1234',
    password: 'password'
  });
  
  //otomatik test için veritabanı oluşturan aşağıdaki kodları zamanım yetmediği için yazdırdım. bana ait değiller
  // Örnek seferler oluştur
  const trips = [
    {
      from: 'Istanbul',
      to: 'Ankara',
      date: '2023-04-15',
      time: '10:00',
      bus: 'ABC123',
      price: 50
    },
    {
      from: 'Istanbul',
      to: 'Izmir',
      date: '2023-04-15',
      time: '12:00',
      bus: 'DEF456',
      price: 75
    },
    {
      from: 'Ankara',
      to: 'Izmir',
      date: '2023-04-15',
      time: '10:00',
      bus: 'ABC124',
      price: 40
  },
  {
    from: 'Ankara',
      to: 'Adana',
      date: '2023-04-15',
      time: '10:00',
      bus: 'ABC128',
      price: 60
  },
  ];
  
  // Örnek seferler için biletler ve koltuklar oluştur
  const bookings = [];
  const seats = [];
  let seatNumber = 1;
  trips.forEach((trip) => {
    const booking = new Booking({
      from: trip.from,
      to: trip.to,
      date: trip.date,
      time: trip.time,
      bus: trip.bus,
      price: trip.price
    });
    bookings.push(booking);
  
    for (let i = 1; i <= 40; i++) {
      const seat = new Seat({
        trip: booking._id,
        number: seatNumber,
        isOccupied: i % 2 === 0,
        gender: i % 2 === 0 ? 'Male' : 'Female',
        passenger: i % 2 === 0 ? 'John Doe' : null
      });
      seats.push(seat);
      seatNumber++;
    }
  });
  
  // Örnek verileri veritabanına kaydet
  User.deleteMany({}, () => {
    user.save();
  });
  
  Booking.deleteMany({}, () => {
    Booking.insertMany(bookings, () => {
      console.log('Trips inserted into database');
    });
  });
  
  Seat.deleteMany({}, () => {
    Seat.insertMany(seats, () => {
      console.log('Seats inserted into database');
    });
  });
  

app.use(express.json());


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/bookings" , bookingRoute)
app.use("/api/trips" , tripRoute)
app.use("/api/seats" , seatRoute)
app.use("/api/tickets" , ticketRoute)

// Sefer olmayan şehirler arasında istek yapıldığında hata döndür
app.use((req, res, next) => {
  res.status(404).json({ message: 'No such trip found' });
});

app.listen(process.env.PORT , ()=>{
    connect();
    console.log(`Server is running on port ${process.env.PORT}`)
})

