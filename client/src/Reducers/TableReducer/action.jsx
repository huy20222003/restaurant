import { GET_ALL_TABLES, GET_ONE_TABLE, CREATE_TABLE, UPDATE_TABLE, DELETE_TABLE } from "./constants"


export const getAll = (payload)=> {
    return {
        type: GET_ALL_TABLES,
        payload,
    }
}

export const getOne = (payload)=> {
    return {
        type: GET_ONE_TABLE,
        payload,
    }
}

export const createTable = (payload)=> {
    return {
        type: CREATE_TABLE,
        payload,
    }
}

export const updateTable = (payload)=> {
    return {
        type: UPDATE_TABLE,
        payload,
    }
}

export const deleteTable = (payload)=> {
    return {
        type: DELETE_TABLE,
        payload,
    }
}