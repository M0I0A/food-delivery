const request = require('supertest');
const app = require('../server');
const { sequelize, Organization, Item, Pricing } = require('../models');

describe('Pricing Controller', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });

    // Seed test data
    const organization = await Organization.create({ name: 'Test Organization' });
    const perishableItem = await Item.create({ type: 'perishable', description: 'Fruits' });
    const nonPerishableItem = await Item.create({ type: 'non-perishable', description: 'Snacks' });

    await Pricing.bulkCreate([
      {
        organizationId: organization.id,
        itemId: perishableItem.id,
        zone: 'central',
        baseDistanceInKm: 5,
        kmPrice: 1.5,
        fixPrice: 1000,
      },
      {
        organizationId: organization.id,
        itemId: nonPerishableItem.id,
        zone: 'central',
        baseDistanceInKm: 5,
        kmPrice: 1,
        fixPrice: 1000,
      },
    ]);
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should calculate delivery price for perishable items', async () => {
    const response = await request(app)
      .post('/api/pricing/calculate-delivery-price')
      .send({
        zone: 'central',
        organizationId: '1',
        totalDistance: 12,
        itemType: 'perishable',
      });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ totalPrice: 20.5 });
  });

  it('should calculate delivery price for non-perishable items', async () => {
    const response = await request(app)
      .post('/api/pricing/calculate-delivery-price')
      .send({
        zone: 'central',
        organizationId: '1',
        totalDistance: 12,
        itemType: 'non-perishable',
      });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ totalPrice: 17 });
  });

  it('should return an error for invalid item type', async () => {
    const response = await request(app)
      .post('/api/pricing/calculate-delivery-price')
      .send({
        zone: 'central',
        organizationId: '1',
        totalDistance: 12,
        itemType: 'invalid',
      });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: 'Invalid item type' });
  });

  it('should return an error for missing pricing data', async () => {
    const response = await request(app)
      .post('/api/pricing/calculate-delivery-price')
      .send({
        zone: 'invalid',
        organizationId: '1',
        totalDistance: 12,
        itemType: 'perishable',
      });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: 'No pricing found for the given organization, item type, and zone',
    });
  });
});