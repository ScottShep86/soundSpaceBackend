const router = require("express").Router();

const Job = require("../models/Job.model");

const { isAuthenticated } = require("../middleware/jwt.middleware");

//GET all the posted jobs
router.get("/", async (req, res, next) => {
  try {
    const allJobs = await Job.find();
    res.status(200).json(allJobs);
  } catch (error) {
    console.error(error);
  }
});


//GET one job
router.get("/:jobId", isAuthenticated, async (req, res, next) => {
  try {
    const oneJob = await Job.findById(req.params.jobId);
    res.status(200).json(oneJob);
  } catch (error) {
    console.error(error);
  }
});

//POST to create a job
router.post("/", isAuthenticated, async (req, res, next) => {
  const payload = req.body
  /* console.log(req.music) */
  try {
    const newJob = await Job.create({...payload, createdBy: req.music.producerId});
    res.status(201).json(newJob);
  } catch (error) {
    console.error(error);
  }
});

//PUT to edit a job
router.put("/:jobId", isAuthenticated, async (req, res, next) => {
  try {
    const editJob = req.params.jobId;
    const updatedJob = await Job.findByIdAndUpdate(
      { _id: editJob, createdBy: req.music.producerId },
      { $set: req.body },
      { new: true }
    );
    if (!updatedJob) {
      return res
        .status(404)
        .json({ message: "Job not found or unauthorized access" });
    }
    res.status(200).json(updatedJob);
  } catch (error) {
    console.error(error);
  }
});

//DELETE to delete a job
router.delete("/:jobId", isAuthenticated, async (req, res, next) => {
  try {
    const deleteJob = req.params.jobId;
    const deletedJob = await Job.findByIdAndDelete({
      _id: deleteJob,
      createdBy: req.music.producerId,
    });
    if (!deletedJob) {
      return res
        .status(404)
        .json({ message: "Job not found or unauthorized access" });
    }
    res.status(200).json({ message: "Job Listing successfully deleted" });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
