import dotenv from 'dotenv'
import session from 'express-session'
import store from '../mongoose/store.js'

dotenv.config()

const secret = process.env.SECRET || "kupakeep"

export default session({
    secret,
    store,
    saveUninitialized: false,
    resave: false
})
