const { getTripDetail } = require("../controllers/trip.controller");
const { verifyTokenAndAuthorization } = require("./verifyToken");

const router = require("express").Router();

router.get('/:id',verifyTokenAndAuthorization , getTripDetail)

module.exports = router;