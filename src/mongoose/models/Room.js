import mongoose from 'mongoose'
const {Schema, model} = mongoose

const RoomSchema = new Schema({
    host: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }]
})

const Room = model('Room', RoomSchema)
export default Room