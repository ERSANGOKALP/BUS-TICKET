const { createRoute, updateRoute, deleteRoute, getRoute, getRoutes } = require("../controllers/route.controller");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post('/' , createRoute )
//UPDATE
router.put('/:id', updateRoute)
//DELETE
router.delete('/:id', deleteRoute)
//GET
router.get('/:id', getRoute)
//GETALL
router.get('/',  getRoutes)

module.exports = router;