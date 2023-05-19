const router = require("express").Router();

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { isAuthenticated } = require('../middleware/jwt.middleware')

const Producer = require('../models/Producer.model');
const RecordLabel = require('../models/RecordLabel.model');

//GET signup producer page
router.get('/signup/producer', (req, res, next) => {
    res.json({ message: 'Signup page for producers' })
})

//GET signup record label page
router.get('/signup/record-label', (req, res, next) => {
    res.json({ message: 'Signup page for record labels' })
})

//POST to signup as Producer
router.post('/signup/producer', async (req, res) => {
    // make the salt
    const salt = bcryptjs.genSaltSync(13);
    // hash the password
    const hashPassword = bcryptjs.hashSync(req.body.password, salt)

    try {
        await Producer.create({email: req.body.email, password: hashPassword, name: req.body.name,})
        res.status(201).json({ message: 'New producer created'})
    } catch (error) {
        console.error(error)
    }
})


//POST to signup as Record Label
router.post('/signup/record-label', async (req, res) => {
    // make the salt
    const salt = bcryptjs.genSaltSync(13);
    // hash the password
    const hashPassword = bcryptjs.hashSync(req.body.password, salt)

    try {
        await RecordLabel.create({email: req.body.email, password: hashPassword, name: req.body.name,})
        res.status(201).json({ message: 'New record label created'})
    } catch (error) {
        console.error(error)
    }
})

//POST to login as Producer
router.post('/login', async (req, res) => {
    //does the producer exist
    const potentialProducer = await Producer.findOne({email: req.body.email})
    if (potentialProducer) {
        //check password
        if (bcryptjs.compareSync(req.body.password, potentialProducer.password)) {
            //correct Password
            const authToken = jwt.sign({producerId: potentialProducer._id}, process.env.TOKEN_SECRET, {
                algorithm: 'HS256',
                expiresIn: '6h'
            });
            res.json(authToken)
        } else {
            res.status(401).json({ message: 'Incorrect password' });
        } 
    } else {
        res.status(404).json({ message: 'User does not exist' });
    }
})


//POST to Login as Record Label

router.post('/login', async (req, res) => {
    //does the producer exist
    const potentialRecordLabel = await RecordLabel.findOne({email: req.body.email})
    if (potentialRecordLabel) {
        //check password
        if (bcryptjs.compareSync(req.body.password, potentialRecordLabel.password)) {
            //correct Password
            const authToken = jwt.sign({recordLabelId: potentialRecordLabel._id}, process.env.TOKEN_SECRET, {
                algorithm: 'HS256',
                expiresIn: '6h'
            });
            res.json(authToken)
        } else {
            res.status(401).json({ message: 'Incorrect password' });
        } 
    } else {
        res.status(404).json({ message: 'User does not exist' });
    }
})


//GET to verify Producer
router.get('/verify', isAuthenticated, async (req, res) => {
    const producer = await Producer.findById(req.music.producerId)
    res.status(200).json({ message: 'User is authenticated', producer })
  })

//GET to verify Record Label
router.get('/verify', isAuthenticated, async (req, res) => {
    const recordLabel = await RecordLabel.findById(req.music.recordLabelId)
    res.status(200).json({ message: 'User is authenticated', recordLabel })
  })

module.exports = router