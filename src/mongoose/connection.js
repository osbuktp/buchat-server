import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

mongoose.connect(process.env.MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})

export default mongoose.connection