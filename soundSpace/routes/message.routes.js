const router = require('express').Router();

const Message = require('../models/Message.model')
const Job = require('../models/Job.model');

//GET all the message from a specific job
router.get("/", async (req, res, next) => {
    try {
      const messagesFromJob = await Message.findById();
      res.status(200).json(allJobs);
    } catch (error) {
      console.error(error);
    }
  });

//POST to create a message
router.post("/", async (req, res, next) => {
    const payload = req.body
    /* console.log(req.music) */
    const {jobId} = req.params
    try {
      const newMessage = await Message.create({...payload, job: jobId});
      res.status(201).json(newMessage);
    } catch (error) {
      console.error(error);
    }
  });

module.exports = router