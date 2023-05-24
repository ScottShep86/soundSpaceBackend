const router = require("express").Router()

const Job = require("../models/Job.model")
const Producer = require("../models/Producer.model")

const { isAuthenticated } = require("../middleware/jwt.middleware");

//GET route to profile page
router.get("/:id", isAuthenticated, async (req, res, next) => {
    try {
        const {id} = req.params
        const producer = await Producer.findById(id)
        res.status(200).json(producer)
    } catch (error) {
        console.error(error)
    }
})


// //GET route to display the profile to the Producer
// router.get("/profile", isAuthenticated, async (req, res, next) => {
//     try {
//         const allJobs = await Job.find({createdBy: req.producer._id})
//         res.status(200).json(allJobs)
//     } catch (error) {
//         console.error(error)
//     }
// })

//PUT to edit my profile
/* router.put("/:id/edit", isAuthenticated, async (req, res, next) => {
    try {
      const editProfile = req.params.profileId;
      const updatedProfile = await Producer.findByIdAndUpdate(
        { _id: editProfile, createdBy: req.producer._id },
        { $set: req.body },
        { new: true }
      );
      if (!updatedProfile) {
        return res
          .status(404)
          .json({ message: "Unauthorized access" });
      }
      res.status(200).json(updatedProfile);
    } catch (error) {
      console.error(error);
    }
  });

  // DELETE to delete a profile
router.delete("/:id", isAuthenticated, async (req, res, next) => {
    try {
      const profileId = req.params.jobId;
      const deletedProfile = await Producer.findOneAndDelete({ _id: profileId, createdBy: req.producer.id });
      if (!deletedProfile) {
        return res.status(404).json({ message: 'Profile not found or unauthorized access' });
      }
      res.status(200).json({ message: 'Profile successfully deleted' });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }); */

  module.exports = router;