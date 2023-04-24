const Seat =require("../models/seat.model.js")
const createError = require("../utils/error.js")

//CREATE SEAT
const createSeat = async (req,res,next) => {   
    

    const newSeat = new Seat(req.body)   
    if(!newSeat) return next(createError(404,"Seat is not create"))    
    try {        
        const savedSeat = await newSeat.save();        
    try {
        await Bus.findByIdAndUpdate( req.body.bus , {
            $push:{seats:savedSeat._id}
          },{new:true},
          ); 
          res.status(201).json(savedSeat)
    } catch (err) {
        next(err);
    }    
        
    } catch (err) {
        next(err);
    }
}

//UPDATE SEAT
const updateSeat = async (req,res, next) => {
    try {
        const updatedSeat = await Seat.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true})
        if(!updatedSeat) return next(createError(404,"Seat is not found"))
        res.status(200).json(updateSeat)
    } catch (err) {
        next(err);
    }
}
//DELETE SEAT
const deleteSeat = async (req,res,next) => {
    const id = req.params.id
    if(!id) return next(createError(400,"Id is required"))
    try {
        const deletedSeat = await Seat.findByIdAndDelete(id)
        if(!deletedSeat) return next(createError(404,"Seat is not found"))
        try {
            await Bus.findByIdAndUpdate( id , {
                $pull:{seats:savedSeat._id}
              },{new:true},
              ); 
        } catch (err) {
            next(err);
        }
        return res.status(200).json("Bus has been deleted...")
    } catch (err) {
        next(err)
    }
}
//GET SEATS
const getSeat = async (req,res,next) => {
    const id = req.params.id
    if(!id) return next(createError(400,"Id is required"))
    try {
        const getSeat = await Seat.findById(id)
        if(!getSeat) return next(createError(404,"Seat is not found"))
        return res.status(200).json(getSeat)
    } catch (err) {
        next(err)
    } 
}
// GET ALL SEATS
const getSeats = async (req,res) => {    
    try {
        const seats = await Seat.find({})
        res.status(200).json(seats);
    } catch (err) {
        next(err);
    }    
}

module.exports = {
    createSeat,
    updateSeat,
    deleteSeat,
    getSeat,
    getSeats,
}