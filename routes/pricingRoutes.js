const express = require('express');
const pricingController = require('../controllers/pricingController');

const router = express.Router();

router.post('/calculate-delivery-price', pricingController.calculateDeliveryPrice);

module.exports = router;