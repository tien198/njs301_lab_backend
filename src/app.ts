import './.d.ts/requestHandler.d.ts'

import express from 'express';
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors';
import bodyParser from 'body-parser';
import { error } from 'console';
import Mongoose from 'mongoose';


// Middlewares
import session from './middlewares/session.ts'
import delayServer from './middlewares/delayServer.ts'


import shopRoutes from './routes/shop.ts';
import adminRoutes from './routes/admin.ts';
import authRoutes from './routes/auth.ts';


// Types
import type { Request, Response, NextFunction } from 'express'
import type IErrorRes from './models/interfaces/errorResponse.ts';


const app = express()


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(bodyParser.json())



app.get('/favicon.ico', (req, res) => { res.status(204).end() })



// app.use(delayServer)
app.use(session)



app.use(authRoutes)
app.use('/', shopRoutes)
app.use('/admin', adminRoutes)


app.use((error: Error & IErrorRes, req: Request, res: Response, nex: NextFunction) => {
    const errorRes: IErrorRes = {
        message: error.message ?? 'Server Internal Error!',
        status: error.status ?? 500,
        errors: error.errors
    }
    res.status(500).json(errorRes)
})



Mongoose.connect(process.env.MONGODB_URI!)
    .then(_ => {
        app.listen(5000)
    }
    )
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

