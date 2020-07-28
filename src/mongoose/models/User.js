import mongoose from 'mongoose'
import bcrypt from 'bcrypt'


const {Schema, model} = mongoose

const UserSchema = new Schema({
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        firstName: String,
        lastName: String
    },
    rooms: [{
        type: Schema.Types.ObjectId,
        ref: 'Room'
    }]
})

UserSchema.methods.verifyPassword = async function(password) {
    try {
        const result = await bcrypt.compare(password, this.password)
        return result
    } catch (err) {
        throw err
    }
}

UserSchema.statics.hashPassword = async function(password) {
    const saltRounds = process.env.SALTROUNDS || 10
    try {
        return await bcrypt.hash(password, Number(saltRounds))
    } catch (err) {
        throw err
    }
}

export default model('User', UserSchema)