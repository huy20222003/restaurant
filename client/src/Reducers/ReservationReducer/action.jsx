import { CREATE_RESERVATION, CREATE_TABLE, GET_ALL_RESERVATIONS, FILTER_RESERVATION, GET_ALL_BY_ID } from "./constants"


export const getAll = (payload)=> {
    return {
        type: GET_ALL_RESERVATIONS,
        payload,
    }
}

export const getAllById = (payload)=> {
    return {
        type: GET_ALL_BY_ID,
        payload,
    }
}

export const createTable = (payload)=> {
    return {
        type: CREATE_TABLE,
        payload,
    }
}

export const createReservation = (payload)=> {
    return {
        type: CREATE_RESERVATION,
        payload,
    }
}

export const filterReservation = (payload)=> {
    return {
        type: FILTER_RESERVATION,
        payload,
    }
}