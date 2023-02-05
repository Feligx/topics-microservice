const express = require('express')
const topicsRouter = require('./topicsRouter')

function routerAPI(app) {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/topics', topicsRouter)
}

module.exports = routerAPI;