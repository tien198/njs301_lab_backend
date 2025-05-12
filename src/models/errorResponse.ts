import type IErrorRes from "./interfaces/errorResponse.ts";

export default class ErrorRes<T extends object> implements IErrorRes {
    constructor(
        public message: string,
        public status?: number,
        public errors?: T
    ) { }
}