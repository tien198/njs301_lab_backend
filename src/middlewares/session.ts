import '../.d.ts/express-session.d.ts'

import dotenv from 'dotenv'
dotenv.config()
import session from 'express-session'
import mongoDbSession from 'connect-mongodb-session'



const MongoDBStore = mongoDbSession(session)


const store = new MongoDBStore({
    uri: process.env.MONGODB_URI!,
    collection: 'sessions'
})

store.on('error', error => {
    console.error(error)
})

const midlleware = session({
    secret: 'secret key',
    resave: true,
    saveUninitialized: false,
    
    store: store
})

export default midlleware