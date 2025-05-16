import type IErrorRes from "./interfaces/errorResponse.ts";

export default class ErrorRes<T extends object> extends Error implements IErrorRes {
    constructor(
        message: string,
        public status?: number,
        public cause?: T
    ) {
        super(message)
    }
}
