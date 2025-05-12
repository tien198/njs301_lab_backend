import type { Document, ObjectId } from 'mongoose'

export default interface IProduct extends Document {
    _id: ObjectId
    title: string
    price: number
    imageUrl: string
    description: string
}

