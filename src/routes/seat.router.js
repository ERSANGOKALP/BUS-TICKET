const { getSeats } = require("../controllers/seat.controller");
const { verifyTokenAndAuthorization } = require("./verifyToken");

const router = require("express").Router();

router.get('/', verifyTokenAndAuthorization , getSeats)

module.exports = router;