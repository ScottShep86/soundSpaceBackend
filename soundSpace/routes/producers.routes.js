const router = require("express").Router();
const Producer = require('../models/Producer.model');

//GET all producers
router.get("/producers", async (req, res, next) => {
    try {
        const response = await Producer.find();
        res.send({ data: response });
    } catch (error) {
        console.error(error)
    }
})

//GET one producer
router.get("/producers/:producerId", async (req, res) => {
    try {
        const producer = await Producer.findById(req.params.producerId)
        res.status(200).json(producer)
    } catch (error) {
        console.error(error)
    }
})

module.exports = router;
