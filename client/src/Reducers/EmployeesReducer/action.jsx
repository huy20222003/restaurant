import {CREATE_EMPLOYEE, DELETE_EMPLOYEE, GET_ALL_EMPLOYEES} from './constants';

export const getAllEmployees = (payload)=> {
    return {
        type: GET_ALL_EMPLOYEES,
        payload
    }
}

export const createEmployee = (payload)=> {
    return {
        type: CREATE_EMPLOYEE,
        payload
    }
}

export const deleteEmployee = (payload)=> {
    return {
        type: DELETE_EMPLOYEE,
        payload
    }
}