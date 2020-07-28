import mongoose from 'mongoose'
const {Schema, model} = mongoose


const MessageSchema = new Schema({
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

const Message = model('Message', MessageSchema)
export default Message