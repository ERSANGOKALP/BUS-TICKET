const router = require("express").Router();
const { updateUser, deleteUser } = require("../controllers/user.controller");
const { verifyTokenAndAuthorization } = require("./verifyToken");


router.put("/:id",verifyTokenAndAuthorization , updateUser );
router.delete("/id",verifyTokenAndAuthorization, deleteUser)


module.exports = router;
