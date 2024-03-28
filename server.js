const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const pricingRoutes = require('./routes/pricingRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/pricing', pricingRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Food Delivery API is running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});