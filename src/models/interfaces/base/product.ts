import type { ObjectId } from "mongodb"

export interface IProduct {
    _id: ObjectId
    title: string
    price: number
    imageUrl: string
    description: string
    userRef: ObjectId
}

