const router = require('express').Router();

const Message = require('../models/Message.model')
const Job = require('../models/Job.model');
const Producer = require('../models/Producer.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

//GET all the message from a specific job
router.get("/", async (req, res, next) => {
    const { jobId } = req.params;
    try {
      const messagesFromJob = await Message.find({ job: jobId });
      res.status(200).json(messagesFromJob);
    } catch (error) {
      console.error(error);
    }
  });

//POST to create a message
/* router.post("/", async (req, res) => {
    const {jobId, producerId, ...payload} = req.body;
    console.log(req.music)
    const {jobId, producerId} = req.music
    try {
      const newMessage = await Message.create({...payload, job: jobId, createdBy: producerId});
      res.status(201).json(newMessage);
    } catch (error) {
      console.error(error);
    }
  }); */
  router.post("/", isAuthenticated, async (req, res) => {
    const { jobId, ...payload } = req.body;
    const { producerId } = req.music;
  
    try {
      const newMessage = await Message.create({
        ...payload,
        job: jobId.jobId,
        createdBy: producerId,
      });
      res.status(201).json(newMessage);
    } catch (error) {
      console.error(error);
    }
  });

module.exports = router