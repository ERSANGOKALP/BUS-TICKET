const Route = require("../models/route.model");
const Bus = require("../models/bus.model");
const Seat = require("../models/seat.model");
const createError = require("../utils/error");

//CREATE
const createRoute = async (req,res,next) => {
  const busId = req.body.bus;  
  
  const {from,to,departureDate,price} = req.body;
  if(!from || !to || !departureDate || !price )
      next(createError(400,"All fields must be filled ")) 
  const newRoute = new Route(req.body)       
  try {      
      const savedRoute = await newRoute.save();   
      try{          
        await Bus.findByIdAndUpdate( busId , {
          $push:{routes:savedRoute._id}
        },{new:true},
        ); 
      } catch(err){
        next(err);
      } 
        res.status(200).json(savedRoute)           
  } catch (err) {
      next(err);
  }
}

//UPDATE
const updateRoute = async (req,res, next) => {
  try {
      const updatedRoute = await Route.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true})
      res.status(200).json(updatedRoute);         
      } catch (err) {
      next(err);
  }
}

//DELETE
const deleteRoute = async (req,res,next) => {
  const id = req.params.id
  if(!id) return next(createError(400,"Id is required"))
  try {
      const deletedRoute = await Route.findByIdAndDelete(id)
      if(!deletedRoute) return next(createError(404,"Route is not found"))
      try {
        await Bus.findByIdAndUpdate( id , {
          $pull:{routes:deleteRoute._id}
        },{new:true},
        ); 
      } catch (err) {
        next(err);
      }
      return res.status(200).json("Route has been deleted...")
  } catch (err) {
      next(err)
  }
}

//GET BUS
const getRoute = async (req,res,next) => {
  const id = req.params.id
  if(!id) return next(createError(400,"Id is required"))
  try {
      const getRoute = await Route.findById(id)
      if(!getRoute) return next(createError(404,"Route is not found"))
      return res.status(200).json(getRoute)
  } catch (err) {
      next(err)
  } 
}

//GET ALL BUS
const getRoutes = async (req,res,next) => {    
  
  try {
      const getAllRoutes = await Route.find()
      if(!getAllRoutes) return next(createError(404,"No any route found"))
      return res.status(200).json(getAllRoutes)
  } catch (err) {
      next(err)
  } 
}


  module.exports = {
    createRoute,
    updateRoute,
    deleteRoute,
    getRoute,
    getRoutes
  }