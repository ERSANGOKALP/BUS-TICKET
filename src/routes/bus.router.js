const router = require('express').Router();
const {createBus, updateBus, deleteBus, getBus, getAllBus} = require('../controllers/bus.controller');

//CREATE
router.post('/' , createBus )
//UPDATE
router.put('/:id', updateBus)
//DELETE
router.delete('/:id', deleteBus)
//GET
router.get('/:id', getBus)
//GETALL
router.get('/',getAllBus)


module.exports = router;