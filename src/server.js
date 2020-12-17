//Load .env variables
require('dotenv').config()

//Import modules
const express = require('express')
const http = require('http')
const cors = require('cors')
const mongoose = require('mongoose')
const requireDir = require('require-dir')
const {io} = require('./utils/socket')

//Start server
const app = express()
const server = http.createServer(app)
io.listen(server)

//Config server
app.use(cors())
app.use(express.json())

//Connect to DB
mongoose.connect(`mongodb+srv://adrien:${process.env.PASSWORD_DB}@monkenote.0mf4g.mongodb.net/<dbname>?retryWrites=true&w=majority`,
{useNewUrlParser: true, useUnifiedTopology: true})
mongoose.set('useCreateIndex', true)
requireDir('./models/')

app.get('/', (req, res)=>{
    res.send('Work!')
})
//Route
app.use('/user', require('./routes/user'))
app.use('/projects', require('./routes/projects'))

server.listen(process.env.PORT, ()=>{
    console.log(`\n🚀 Server started!\nListen port ${process.env.PORT}\n`)
})