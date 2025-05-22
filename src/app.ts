import './.d.ts/requestHandler.d.ts'
// Types
import type { Request, Response, NextFunction } from 'express'
import type ErrorRes from './models/errorResponse.ts';


import express from 'express';
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors';
import bodyParser from 'body-parser';
import { error } from 'console';
import Mongoose from 'mongoose';


// enums
import { Client_URL_Absolute } from './utils/uriEnums/Client_Url.ts';
import { Server_URL } from './utils/uriEnums/Server_Url.ts';


// Middlewares
import sessionMw from './middlewares/sessionMw.ts'
import delayServer from './middlewares/delayServer.ts'


import shopRoutes from './routes/shop.ts';
import adminRoutes from './routes/admin.ts';
import authRoutes from './routes/auth.ts';



const app = express()

app.use('/public', express.static('public'))
// app.use(express.urlencoded({ extended: false }))
// app.use(express.json())


app.use(cors({
    origin: Client_URL_Absolute.base,
    credentials: true
}))



app.get('/favicon.ico', (req, res) => { res.status(204).end() })



// app.use(delayServer)
app.use(sessionMw)



app.use(authRoutes, shopRoutes)

app.use(Server_URL.admin, adminRoutes)


app.use((error: ErrorRes, req: Request, res: Response, nex: NextFunction) => {
    const status = error.status ?? 500
    const message = status === 500 ? 'Server Internal Error!' : error.message ?? 'Unknown error'
    const name = status === 500 ? 'Server Internal Error!' : error.name ?? 'Error'

    const safeError = {
        status,
        message,
        name,
        cause: error.cause
    }

    res.status(status).json(safeError)
})


import bcrypt from 'bcryptjs'
import User from './models/mongooseModels/user.ts';

Mongoose.connect(process.env.MONGODB_URI!)
    .then(_ => {
        app.listen(5000)
        return User.findOne({ email: 'admin@gmail.com' })
    })
    // check existed and create admin user
    .then(user => {
        if (!user) {
            const hashed = bcrypt.hashSync('123', +process.env.SALT_LENGTH!)
            user = new User({ email: 'admin@gmail.com', password: hashed, isAdmin: true })
            return user.save()
        }
    })
    .catch(err => error(err))


// client.connect()
//     .then(client => client.db('shopLab'))
//     .then(async db => {
//         const prodCol = await productCollection()
//         const prodDocs = await prodCol.find().toArray()
//         if (prodDocs.length <= 0)
//             try {
//                 await prodCol.insertMany([
//                     {
//                         "id": "1",
//                         "title": "A Book",
//                         "imageUrl": "https://www.publicdomainpictures.net/pictures/10000/velka/1-1210009435EGmE.jpg",
//                         "description": "This is an awesome book!",
//                         "price": "19"
//                     },
//                     {
//                         "id": "2",
//                         "title": "Kẻ giả tạo",
//                         "imageUrl": "https://www.publicdomainpictures.net/pictures/10000/velka/1-1210009435EGmE.jpg",
//                         "description": "Woá toẹt zời",
//                         "price": "12"
//                     },
//                     {
//                         "id": "3",
//                         "title": "New Product",
//                         "imageUrl": "https://www.publicdomainpictures.net/pictures/10000/velka/1-1210009435EGmE.jpg",
//                         "description": "description",
//                         "price": "13"
//                     }
//                 ])
//             }
//             catch (err) {
//                 error(err)
//             }
//         const userCol = await userCollection()
//         const userDocs = await userCol.find().toArray()
//         if (userDocs.length <= 0)
//             try {
//                 await userCol.insertOne({ name: 'tien', email: 'admin@gmail.com' })
//             }
//             catch (err) {
//                 error(err)
//             }
//     })
//     .catch(err => error(err))

