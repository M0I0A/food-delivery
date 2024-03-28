# Food Delivery App

This is a backend application for a food delivery service that calculates the delivery price based on various factors such as distance, item type, and pricing structure of the organization.

## Prerequisites

- Node.js (v12 or higher)
- PostgreSQL

## Setup

1. Clone the repository:
git clone https://github.com/M0I0A/food-delivery-app.git
2. Install dependencies:
cd food-delivery-app
npm install


3. Create a `.env` file in the root directory and add the following environment variables:
DB_USERNAME=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_NAME=food_delivery_db
DB_HOST=localhost

4. Create the PostgreSQL database:
npx sequelize-cli db:create

5. Run migrations to create the necessary tables:
npx sequelize-cli db:migrate

6. Start the server:
npm start

The server will start running on `http://localhost:3000`.

## API Documentation

The API documentation is available at `http://localhost:3000/api-docs`.

## Running Tests

To run the test suite, execute the following command:
npm test

## Linting

This project follows the Airbnb JavaScript Style Guide. To lint the codebase, run:

npm run lint

To automatically fix linting errors, run:
npm run lint:fix

## Deployment

The application is deployed on Render.com. You can access the live API at https://food-delivery-y2ra.onrender.com/.

This solution covers the following:

Database models and associations using Sequelize ORM
Dynamic pricing calculation service
API endpoint for calculating delivery price
Input validation and error handling
Test suite with seed data and test cases
Swagger documentation
README with setup instructions and deployment information
Note: Make sure to replace the placeholders (e.g., your_postgres_username, your_postgres_password, [deployed_url]) with the appropriate values for your setup.
