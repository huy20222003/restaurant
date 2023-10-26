import { GET_ALL_PAYMENT } from "./constant"


export const getAll = (payload)=> {
    return {
        type: GET_ALL_PAYMENT,
        payload,
    }
}