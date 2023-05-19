const router = require("express").Router();

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const RecordLabel = require("../models/RecordLabel.model");

//GET signup record label page
router.get("/signup/record-label", (req, res, next) => {
  res.json({ message: "Signup page for record labels" });
});

//POST to signup as Record Label
router.post("/signup/record-label", async (req, res) => {
  // Password format validation regex pattern
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  // Validate password format
  if (!passwordPattern.test(req.body.password)) {
    return res.status(400).json({ message: "Invalid password format" });
  }
  try {
    // Check if the Record Label already exists
    const existingRecordLabel = await RecordLabel.findOne({
      email: req.body.email,
    });
    if (existingRecordLabel) {
      return res.status(409).json({ message: "Record label already exists" });
    }
    // make the salt
    const salt = bcryptjs.genSaltSync(13);
    // hash the password
    const hashPassword = bcryptjs.hashSync(req.body.password, salt);
    await RecordLabel.create({
      companyName: req.body.companyName,
      email: req.body.email,
      password: hashPassword,
      logo: req.body.logo,
      location: req.body.location,
      aboutUs: req.body.aboutUs,
      associatedActs: req.body.associatedActs
    });
    res.status(201).json({ message: "New record label created" });
  } catch (error) {
    console.error(error);
  }
});

//POST to Login as Record Label

router.post("/login", async (req, res) => {
  //does the producer exist
  const potentialRecordLabel = await RecordLabel.findOne({
    email: req.body.email,
  });
  if (potentialRecordLabel) {
    //check password
    if (
      bcryptjs.compareSync(req.body.password, potentialRecordLabel.password)
    ) {
      //correct Password
      const authToken = jwt.sign(
        { recordLabelId: potentialRecordLabel._id },
        process.env.TOKEN_SECRET,
        {
          algorithm: "HS256",
          expiresIn: "6h",
        }
      );
      res.json(authToken);
    } else {
      res.status(401).json({ message: "Incorrect password" });
    }
  } else {
    res.status(404).json({ message: "User does not exist" });
  }
});

//GET to verify Record Label
router.get("/verify", isAuthenticated, async (req, res) => {
  const recordLabel = await RecordLabel.findById(req.music.recordLabelId);
  res.status(200).json({ message: "User is authenticated", recordLabel });
});

module.exports = router;
