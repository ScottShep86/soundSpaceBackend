const router = require('express').Router();

const Producer = require('../models/Producer.model');
const Review = require('../models/Review.model');

router.get('/producer/:producerId/reviews/create', (req, res, next))

module.exports = router