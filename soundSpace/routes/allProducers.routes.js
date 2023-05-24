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

/* router.get("/producers", async (req, res, next) => {
  const { search } = req.query
  try {
      let filter = {}
      if(searchName) {
          filter = {name: {$regex: searchName, $option: "i"}}
      }
      if(searchLocation) {
          filter = {location: {$regex: search, $option: "i"}}
      }
      if(searchGenre) {
          filter = {genre: {$regex: search, $option: "i"}}
      }
      const allProducers = await Producer.find(filter);
      res.status(200).json(allProducers);
  } catch (error) {
      console.error(error)
  }
}) */

module.exports = router;
