import type ISuccessRes from "./interfaces/successResponse.ts";

export default class SuccessRes implements ISuccessRes {
    constructor(
        public message: string,
        public status?: number,
        public infor?: object,
    ) { }
}