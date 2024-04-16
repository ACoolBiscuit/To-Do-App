const Router = require('express').Router()
const { MongoClient, ObjectId } = require('mongodb')

const url = process.env.MONGODB_URI || require('./secrets/mongodb.json').url
const client = new MongoClient(url)

const getCollection = async (dbName, collectionName) => {
    await client.connect()
    return client.db(dbName).collection(collectionName)
}

// End Points 

// GET /api/todos
Router.get('/', async (request, response) => {
	const collection = await getCollection('todo-api', 'todos')
	const todos = await collection.find({}).toArray()
    response.json(todos)
})

// POST /api/todos
Router.post('/', async (request, response) => {
	const collection = await getCollection('todo-api', 'todos')
	const { item } = request.body
	const complete = false
    const result = await collection.insertOne({ item, complete })
    response.json(result)
})

// PUT /api/todos/:id
Router.put('/:id', async (request, response) => {
	const collection = await getCollection('todo-api', 'todos')
	const { id } = request.params
	const todo = await collection.findOne({ _id: new ObjectId({ id }) })
	const complete = !todo.complete
	const result = await collection.updateOne({ _id: new ObjectId({ id }) }, { $set: { complete } })
	response.json(result)
})

module.exports = Router