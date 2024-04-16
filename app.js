
const express = require('express')
const app = express()

const { getCollection, ObjectID } = require('./api-routes')

const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.static('public'))
app.use('/api/todos', require('./api-routes'))

app.get('/', (_, response) => {
	response.sendFile('index.html', { root })
})

const message = `Server running: http://localhost:${port}`
app.listen(port, () => console.log(message))