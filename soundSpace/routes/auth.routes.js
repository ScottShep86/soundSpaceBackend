const router = require("express").Router();

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

/* const Producer = require('../models/Producer.model');
const RecordLabel = require('../models/RecordLabel.model') */

//GET signup producer page
router.get('/signup/producer', (req, res, next) => {
    res.json()
})

//GET signup record label page
router.get('/signup/record-label', (req, res, next) => {
    res.json()
})

//POST to signup as Producer
router.post('/signup/producer', async (req, res) => {
    // make the salt
    const salt = bcryptjs.genSaltSync(13);
    // hash the password
    const hashPassword = bcryptjs.hashSync(req.body.password, salt)

    try {
        await Producer.create({email: req.body.email, password: hashPassword})
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
        await RecordLabel.create({email: req.body.email, password: hashPassword})
        res.status(201).json({ message: 'New record label created'})
    } catch (error) {
        console.error(error)
    }
})

//POST to login as Producer


//POST to Login as Record Label
