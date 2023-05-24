const router = require("express").Router();

const Producer = require("../models/Producer.model");

//GET all the producers
router.get("/", async (req, res, next) => {
  try {
    const allProducers = await Producer.find();
    res.status(200).json(allProducers);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
