const express = require('express')
const users = require('./data/Users')

const app = express()

app.get('/', (req, res) => {
    res.send("API is runnign...")
})

app.get('/api/users', (req, res) => {
    res.json(users)
})

app.get('/api/users/:id', (req, res) => {
    const user = users.find((u) => u.id === req.params.id)
    res.json(user)
})

app.get('/api/users/:id/bloodpressure', (req, res) => {
    const user = users.find((u) => u.id === req.params.id)
    res.json(user.bloodpressure)
})

app.listen(5000, console.log('Server running o port 5000'))