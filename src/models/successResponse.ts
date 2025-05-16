import type ISuccessRes from "./interfaces/response/success/index.ts";

export default class SuccessRes<T extends object> implements ISuccessRes<T> {
    constructor(
        public message: string,
        public status?: number,
        public infor?: T,
    ) { }
}