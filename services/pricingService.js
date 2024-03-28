const { Pricing, Item } = require('../models');

const calculateDeliveryPrice = async (request) => {
  const { zone, organizationId, totalDistance, itemType } = request;

  const item = await Item.findOne({ where: { type: itemType } });
  if (!item) {
    throw new Error('Invalid item type');
  }

  const pricing = await Pricing.findOne({
    where: { organizationId, itemId: item.id, zone },
    include: [
      {
        model: Item,
        as: 'item',
        attributes: ['type'],
      },
    ],
  });

  if (!pricing) {
    throw new Error('No pricing found for the given organization, item type, and zone');
  }

  const { baseDistanceInKm, kmPrice, fixPrice } = pricing;
  const distanceBeyondBase = Math.max(0, totalDistance - baseDistanceInKm);
  const totalPrice = fixPrice + (distanceBeyondBase * kmPrice * 100);

  return { totalPrice: totalPrice / 100 };
};

module.exports = { calculateDeliveryPrice };