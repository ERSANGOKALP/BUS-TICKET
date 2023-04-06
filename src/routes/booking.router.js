const { trips, addBooking  } = require("../controllers/booking.controller");
const { verifyTokenAndAuthorization } = require("./verifyToken");

const router = require("express").Router();

router.get('/trips/:from/:to', verifyTokenAndAuthorization , trips)
router.post('/' , verifyTokenAndAuthorization , addBooking)




module.exports = router;