import Message from '../../mongoose/models/Message.js'


async function sendMessage(socket) {
    const {room, sender, text} = socket.request.user
    const message = new Message({
        room,
        sender,
        text
    })
    await message.save()
    socket.to(room).emit('message', message)
}

export {sendMessage}