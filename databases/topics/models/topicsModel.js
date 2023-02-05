const mongoose = require('mongoose')
const { Schema } = mongoose

const topicSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    }
})

const topicsModel = mongoose.model('Topic', topicSchema)

module.exports = topicsModel