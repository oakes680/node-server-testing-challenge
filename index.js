require('dotenv').config();

const express = require('express')

const userRouter = require('./users/users-router')
const helmet = require('helmet')
const server = express()

server.use(helmet())
server.use(express.json())

server.use('/api', userRouter)


const port = process.env.PORT || 1950

server.listen(port, () => {
    console.log(`you are on ${port}`)
})

