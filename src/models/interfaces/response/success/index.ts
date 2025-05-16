import type IRes from "../response.ts";

export default interface ISuccessRes<T extends object> extends IRes {
    infor?: T
}