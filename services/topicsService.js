const topicsModel = require('../databases/topics/models/topicsModel')

class topicsService {
  constructor() {}

  checkId(id) {
    const regex = new RegExp(/^[a-f\d]{24}$/i)
    return regex.test(id)
  }
  async getTopics(params) {
    const { name, limit, offset } = params

    const count = await topicsModel.find({active: true}).count()

    console.log(count)
    if (name) {
        const topics = await topicsModel.find({ active: true, name: { $regex: name, $options: 'i' }}).limit(limit || 10).skip( (limit || 10) * offset || 0).select('-__v -active')
        return topics
    } else {
      const topics = await topicsModel.find({active: true}).limit(limit || 10).skip((limit || 10) * offset || 0).select('-__v -active')
      return topics
    }
  }

  async getTopic(id) {
    console.log(`Get topic ${id}`)
    if (!id) {
      throw new Error('{ message: "Id is required", status: 400 }')
    }

    const topic = await topicsModel.findById(id).select('-__v -active')

    if (!topic) {
        throw new Error('{ "message": "Topic not found", "status": 404 }')
    }

    return topic
  }

  async updateTopic(id, data) {

    if (!id) {
      throw new Error('{ "message": "Id is required", "status": 400 }')
    } else if (!data.name) {
      throw new Error('{ "message": "Name is required", "status": 400 }')
    }

    console.log(`Update topic ${id}`)

    if (!this.checkId(id)) throw new Error('{ "message": "Id is not valid", "status": 400 }')

    const exists = await topicsModel.exists({_id: `${id}`})
    if (!exists) {
      throw new Error('{ "message": "Topic not found", "status": 404 }')
    }

    topicsModel.findByIdAndUpdate(id, {name: data.name, updatedAt: Date.now()}, (err) => {
      if (err) {
        throw new Error('{ "message": "Topic not found inner", "status": 404 }')
      }
    })


    return {
      message: 'Topic updated'
    }
  }

  async createTopic(name) {
    if (!name) {
      throw new Error('{ "message": "Name is required", "status": 400 }')
    }

    const exists = await topicsModel.findOne({name})

    if (exists && exists.active === false) {

      topicsModel.updateOne({name}, {active: true, updatedAt: Date.now()}, (err) => {
        if (err) {
          throw new Error('{ "message": "Topic not found inner", "status": 404 }')
        }
      })
    } else if (exists && exists.active === true) {
        throw new Error('{ "message": "Topic already exists", "status": 400 }')
    } else {

      const newTopic = new topicsModel({
        name,
        createdAt: Date.now(),
      })

      await newTopic.save()
    }

    return {
      message: 'Topic created'
    }
  }

  async deleteTopic(id) {
    if (!id) {
      throw new Error('{ "message": "Id is required", "status": 400 }')
    }

    const exists = await topicsModel.findById({_id: `${id}`})
    if (!exists) {
      throw new Error('{ "message": "Topic not found", "status": 404 }')
    } else if (exists.active === false) {
      throw new Error('{ "message": "Topic already deleted", "status": 400 }')
    }

    topicsModel.findByIdAndUpdate(id, {active: false}, (err) => {
      if (err) {
        throw new Error('{ "message": "Topic not found inner", "status": 404 }')
      }
    })

    return {
      message: 'Topic deleted'
    }
  }
}

module.exports = topicsService
