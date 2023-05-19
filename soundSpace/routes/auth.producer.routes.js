const router = require("express").Router();

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const Producer = require("../models/Producer.model");

//GET signup producer page
router.get("/signup/producer", (req, res, next) => {
  res.json({ message: "Signup page for producers" });
});

//POST to signup as Producer
router.post("/signup/producer", async (req, res) => {
  // Password format validation regex pattern
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  // Validate password format
  if (!passwordPattern.test(req.body.password)) {
    return res.status(400).json({ message: "Invalid password format" });
  }
  try {
    // Check if the Producer already exists
    const existingProducer = await Producer.findOne({
      email: req.body.email,
    });
    if (existingProducer) {
      return res.status(409).json({ message: "Producer already exists" });
    }
    // make the salt
    const salt = bcryptjs.genSaltSync(13);
    // hash the password
    const hashPassword = bcryptjs.hashSync(req.body.password, salt);
    await Producer.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      picture: req.body.picture,
      location: req.body.location,
      aboutMe: req.body.aboutMe,
      associatedActs: req.body.associatedActs,
      genre: req.body.genre,
    });
    res.status(201).json({ message: "New producer created" });
  } catch (error) {
    console.error(error);
  }
});

//POST to login as Producer
router.post("/login", async (req, res) => {
  //does the producer exist
  const potentialProducer = await Producer.findOne({ email: req.body.email });
  if (potentialProducer) {
    //check password
    if (bcryptjs.compareSync(req.body.password, potentialProducer.password)) {
      //correct Password
      const authToken = jwt.sign(
        { producerId: potentialProducer._id },
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

//GET to verify Producer
router.get("/verify", isAuthenticated, async (req, res) => {
  const producer = await Producer.findById(req.music.producerId);
  res.status(200).json({ message: "User is authenticated", producer });
});

module.exports = router;
