import express from 'express'
import dotenv from 'dotenv'
import users from './data/Users.js'

dotenv.config()

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

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode o port ${PORT}`))