const { getSeats, createSeat, updateSeat, deleteSeat, getSeat } = require("../controllers/seat.controller");
const { verifyTokenAndAuthorization } = require("./verifyToken");

const router = require("express").Router();

//CREATE SEAT
router.post('/', createSeat)
//UPDATE SEAT
router.put('/:id', updateSeat)
//DELETE SEAT
router.delete('/:id', deleteSeat)
//GET SEATS
router.get('/', getSeat)
// GET ALL SEATS
router.get('/', verifyTokenAndAuthorization , getSeats)

module.exports = router;