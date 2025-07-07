const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const authRoutes = require('./routes/auth.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

// Swagger docs
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Art Shop API (Express)',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
});
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect DB and start server
db.sync().then(() => {
  app.listen(process.env.PORT || 3000, () =>
    console.log(`Server running on port ${process.env.PORT || 3000}`),
  );
});
