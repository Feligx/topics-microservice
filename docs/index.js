const swaggerUI = require('swagger-ui-express');

function startDocs(app) {
  const swaggerDocument = require('./swagger.json');
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
}

module.exports = startDocs;