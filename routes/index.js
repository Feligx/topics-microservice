const express = require('express')
const topicsRouter = require('./topicsRouter')
const startDocs = require("../docs");

function routerAPI(app) {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/topics', topicsRouter)
  startDocs(router)
}

module.exports = routerAPI;