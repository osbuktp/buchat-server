import session from 'express-session'
import connect from 'connect-mongo'
import connection from './connection.js'

const MongoStore = connect(session)

export default new MongoStore({
    mongooseConnection: connection
})