import type IRes from "../response.ts";

export default interface IErrorRes extends IRes, Error { }