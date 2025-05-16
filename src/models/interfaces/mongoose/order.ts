import type { Model } from 'mongoose'
import type { IOrder } from '../base/order.ts'



export interface IOrderMethod { }

export interface OrderModel extends Model<IOrder, {}, IOrderMethod> { }