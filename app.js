const express = require('express')
const cors = require('cors')
const notFound = require('./middlewares/notFound')
const error = require('./middlewares/error')
const todoRoute = require('./route/todoRoute')
const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', todoRoute)

app.use(notFound)
app.use(error)

app.listen(PORT, () => console.log(`server start in port ${PORT}`))
