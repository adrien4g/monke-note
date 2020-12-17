const Server = require('socket.io')

//start server
const io = new Server

//Function to emit signal on socket-io client
const socket = {
    emit: (signal, data = '') => io.sockets.emit(signal, data)
}

io.on('connect', (socket)=>{
    console.log(`User ${socket.id} on!`)
})

module.exports = {
    socket, io
}
