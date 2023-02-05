const express = require('express')
const topicsService = require('../services/topicsService')

const router = express.Router()
const service = new topicsService()

router.get('/', async (req, res, next) => {

    try {
        const topics = await service.getTopics(req.query || {} )

        res.json({
            topics
        })
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    console.log(`Get topic ${req.params.id}`)
    try {
        const { id } = req.params
        const topic = await  service.getTopic(id)
        return res.json(topic)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {

    try {
        const { id } = req.params
        res.json(await service.updateTopic(id, req.body))
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { name } = req.body
        await service.createTopic(name)

        res.status(201).json({
            message: 'Topic created'
        })
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    console.log(req.params.id)

    const { id } = req.params

    try {
        await service.deleteTopic(id)

        res.json({
            message: 'Topic deleted'
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router