const express = require('express')
const routerAPI = require('./routes')
const { handleError } = require("./middlewares/errorHandler")
const cors = require('cors')
const helmet = require('helmet')
const config = require('./config')
const connectDB = require('./databases/topics/config')
const app = express()
const port = config.PORT || 3000

connectDB()

app.use(express.json())
app.use(cors())
app.use(helmet())

routerAPI(app)

app.use(handleError)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
