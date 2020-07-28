import dotenv from 'dotenv'
import passportSocketIo from 'passport.socketio'
import passport from '../auth/passport.js'
import socket from 'socket.io'
import store from '../mongoose/store.js'
import cookieParser from 'cookie-parser'

import {sendMessage} from './handlers/messageHandler.js'

import Room from '../mongoose/models/Room.js'

dotenv.config()

export default function(server) {
    const io = socket(server)

    io.use(passportSocketIo.authorize({
        key: 'connect.sid',
        secret: process.env.SECRET,
        store,
        passport,
        cookieParser
    }))

    io.on('connection', async (socket) => {
        const {id} = socket.request.user
        const room = new Room({
            host: id,
            members: [id]
        })
        await room.save()
        console.log(`User ${socket.id} connected`)
        socket.join(room.id)
        console.log(`User joined room ${room.id}`)
        socket.on('message', sendMessage)
        socket.on('disconnect', () => {
            console.log(`User ${socket.id} disconnected`)
        })
    })
}