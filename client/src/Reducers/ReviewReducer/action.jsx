import { CREATE_REVIEW, GET_ALL_REVIEWS_BY_PRODUCT } from "./constants"


export const getAllByProduct = (payload)=> {
    return {
        type: GET_ALL_REVIEWS_BY_PRODUCT,
        payload,
    }
}

export const createReview = (payload)=> {
    return {
        type: CREATE_REVIEW,
        payload,
    }
}