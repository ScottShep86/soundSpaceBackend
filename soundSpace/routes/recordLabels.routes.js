const router = require("express").Router();
const RecordLabel = require('../models/RecordLabel.model');

//GET all Record Labels
router.get("/record-labels", async (req, res, next) => {
    try {
        const response = await RecordLabel.find();
        res.send({ data: response });
    } catch (error) {
        console.error(error)
    }
})

//GET one Record Label
router.get("/record-labels/:recordLabelId", async (req, res) => {
    try {
        const recordLabel = await RecordLabel.findById(req.params.recordLabelId)
        res.status(200).json(recordLabel)
    } catch (error) {
        console.error(error)
    }
})

module.exports = router;