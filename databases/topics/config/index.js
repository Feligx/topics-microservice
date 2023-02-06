const mongoose = require('mongoose').default
const config = require('./../../../config')

function connectDB () {

    console.log(config.DB_URI)
    mongoose.set('strictQuery', false)
    mongoose.connect(config.DB_URI,
        (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log("Connected to database")
            }
        }
    )
}

module.exports = connectDB