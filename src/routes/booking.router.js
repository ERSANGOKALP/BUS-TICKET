const {   } = require("../controllers/booking.controller");
const { verifyTokenAndAuthorization } = require("./verifyToken");

const router = require("express").Router();

router.get('/routes/:from/:to', verifyTokenAndAuthorization , )
router.post('/' , verifyTokenAndAuthorization , )




module.exports = router;