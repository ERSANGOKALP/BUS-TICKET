const { getTickets, getTicketDetails } = require("../controllers/ticketBuy.controller");
const { verifyTokenAndAuthorization } = require("./verifyToken");

const router = require("express").Router();

router.get('/:userId', verifyTokenAndAuthorization , getTickets)
router.get('/:ticketId' , verifyTokenAndAuthorization, getTicketDetails)

module.exports = router;

