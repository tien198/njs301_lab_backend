import type { Model } from "mongoose";
import type { IProduct } from "../base/product.ts";

export interface IProductMethod { }

export interface IProductModel extends Model<IProduct, {}, IProductMethod> { }
