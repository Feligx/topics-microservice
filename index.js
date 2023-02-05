const express = require('express')
const routerAPI = require('./routes')
const { handleError } = require("./middlewares/errorHandler")
const cors = require('cors')
const helmet = require('helmet')
const {default: mongoose} = require("mongoose");

const app = express()
const port = 3000

mongoose.set('strictQuery', false)

mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2",
    (err) => {
      if (err) {
            console.log(err)
        } else {
            console.log("Connected to database")
      }
    }
)

app.use(express.json())
app.use(cors())
app.use(helmet())

routerAPI(app)

app.use(handleError)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
