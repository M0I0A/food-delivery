const pricingService = require('../services/pricingService');

const calculateDeliveryPrice = async (req, res) => {
  try {
    const deliveryPrice = await pricingService.calculateDeliveryPrice(req.body);
    res.json(deliveryPrice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { calculateDeliveryPrice };