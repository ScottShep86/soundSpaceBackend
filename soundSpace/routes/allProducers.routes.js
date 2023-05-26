const router = require("express").Router();

const Producer = require("../models/Producer.model");

//GET all the producers
/* router.get("/", async (req, res, next) => {
  try {
    const allProducers = await Producer.find();
    res.status(200).json(allProducers);
  } catch (error) {
    console.error(error);
  }
}); */

router.get("/", async (req, res, next) => {
  const { search } = req.query
  try {
      let filter = {}
      if(search) {
          filter = {name: {$regex: search, $options: "i"}}
  /*     }
      if(searchLocation) {
          filter = {location: {$regex: search, $option: "i"}}
      }
      if(searchGenre) {
          filter = {genre: {$regex: search, $option: "i"}} */
      }
      console.log(filter)
      const allProducers = await Producer.find(filter);
      res.status(200).json(allProducers);
  } catch (error) {
      console.error(error)
  }
})

module.exports = router;
