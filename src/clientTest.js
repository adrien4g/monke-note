//Load .env variables
const dotenv = require('dotenv').config()

const io = require('socket.io-client')

const socket = io(`http://localhost:${process.env.SERVER_PORT}`)

socket.on('newMessage', (data)=>console.log(data))