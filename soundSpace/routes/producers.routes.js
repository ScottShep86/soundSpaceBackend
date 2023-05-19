const router = require("express").Router();
const axios = require('axios')

// GET all the producers from the DB
router.get('/api/producers', async (req, res, next) => {
  axios.get()
  
  
    try {
    const producers = await Producer.find();
    res.json(producers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' })
  }
});

module.exports = router;
