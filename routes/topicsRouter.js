const express = require('express')
const { body, param, validationResult, query} = require('express-validator')
const topicsService = require('../services/topicsService')
const router = express.Router()
const service = new topicsService()

router.get('/', [query('name').optional().isString().escape(), query('limit').optional().isInt({min: 0}).escape(), query('limit').optional().isInt({min: 0}).escape()], async (req, res, next) => {
    const validationErrors = validationResult(req)
    if (validationErrors.isEmpty()) {

        try {
            const topics = await service.getTopics(req.query || {})

            res.json({
                topics
            })
        } catch (error) {
            next(error)
        }
    } else {
        next(new Error(JSON.stringify({message: 'Invalid query params', status: 400})))
    }
})

router.get('/:id', param('id').exists().isString().isMongoId().escape() , async (req, res, next) => {
    const validationErrors = validationResult(req)
    if (validationErrors.isEmpty()) {
        try {
            const { id } = req.params
            const topic = await  service.getTopic(id)
            return res.json(topic)
        } catch (error) {
            next(error)
        }
    } else {
        next(new Error(JSON.stringify({message: 'Invalid id', status: 400})))
    }
})

router.put('/:id', param('id').exists().isString().isMongoId().escape(), async (req, res, next) => {
    const validationErrors = validationResult(req)
    if (validationErrors.isEmpty()) {
        try {
            const {id} = req.params
            res.json(await service.updateTopic(id, req.body))
        } catch (error) {
            next(error)
        }
    } else {
        next(new Error(JSON.stringify({message: 'Invalid id', status: 400})))
    }
})

router.post('/', body('name').notEmpty().exists().isString().escape(),  async (req, res, next) => {

    const validationErrors = validationResult(req)

    if (validationErrors.isEmpty()) {
        try {
            const {name} = req.body
            await service.createTopic(name)

            res.status(201).json({
                message: 'Topic created'
            })
        } catch (error) {
            next(error)
        }
    } else {
        next(new Error(JSON.stringify({message: 'Invalid name', status: 400})))
    }
})

router.delete('/:id', param('id').exists().isString().isMongoId().escape(), async (req, res, next) => {

    const validationErrors = validationResult(req)

    const { id } = req.params

    if (validationErrors.isEmpty()) {
        try {
            await service.deleteTopic(id)

            res.json({
                message: 'Topic deleted'
            })
        } catch (error) {
            next(error)
        }
    } else {
        next(new Error(JSON.stringify({message: 'Invalid id', status: 400})))
    }
})

module.exports = router