const Bus = require('../models/bus.model');
const createError = require('../utils/error');

//CREATE
const createBus = async (req,res,next) => {
    const {plate,totalSeats,routes,seats} = req.body;
    if(!plate || !totalSeats )
        next(createError(400,"All fields must be filled ")) 
    const newBus = new Bus(req.body)       
    try {
        
        const savedBus = await newBus.save();
        res.status(201).json(savedBus)
    } catch (err) {
        next(err);
    }
}

//UPDATE
const updateBus = async (req,res, next) => {
    try {
        const updatedBus = await Bus.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true})
        res.status(200).json(updatedBus)
    } catch (err) {
        next(err);
    }
}

//DELETE
const deleteBus = async (req,res,next) => {
    const id = req.params.id
    if(!id) return next(createError(400,"Id is required"))
    try {
        const deletedBus = await Bus.findByIdAndDelete(id)
        if(!deletedBus) return next(createError(404,"Bus is not found"))
        return res.status(200).json("Bus has been deleted...")
    } catch (err) {
        next(err)
    }
}

//GET BUS
const getBus = async (req,res,next) => {
    const id = req.params.id
    if(!id) return next(createError(400,"Id is required"))
    try {
        const getBus = await Bus.findById(id)
        if(!getBus) return next(createError(404,"Bus is not found"))
        return res.status(200).json(getBus)
    } catch (err) {
        next(err)
    } 
}

//GET ALL BUS
const getAllBus = async (req,res,next) => {    
    
    try {
        const getAllBus = await Bus.find()
        if(!getAllBus) return next(createError(404,"No any bus found"))
        return res.status(200).json(getAllBus)
    } catch (err) {
        next(err)
    } 
}

module.exports = {
    createBus,
    updateBus,
    deleteBus,
    getBus,
    getAllBus,
}