import { CREATE_PRODUCT, DELETE_PRODUCT, FILTER_PRODUCT, FILTER_PRODUCT_BY_CATEGORY, GET_ALL_PRODUCT, GET_ONE_PRODUCT, SEARCH_PRODUCT, SET_PAGE, SORT_PRODUCT, UPDATE_PRODUCT } from "./constants";

export const getAll = (payload)=> {
    return {
        type: GET_ALL_PRODUCT,
        payload
    }
}

export const getOne = (payload)=> {
    return {
        type: GET_ONE_PRODUCT,
        payload
    }
}

export const setPage = (payload)=> {
    return {
        type: SET_PAGE,
        payload
    }
}

export const createProduct = (payload)=> {
    return {
        type: CREATE_PRODUCT,
        payload
    }
}

export const updateProduct = (payload)=> {
    return {
        type: UPDATE_PRODUCT,
        payload
    }
}

export const deleteProduct = (payload)=> {
    return {
        type: DELETE_PRODUCT,
        payload
    }
}

export const searchProduct = (payload)=> {
    return {
        type: SEARCH_PRODUCT,
        payload
    }
}

export const filterProduct = (payload)=> {
    return {
        type: FILTER_PRODUCT,
        payload
    }
}

export const sortProduct = (payload)=> {
    return {
        type: SORT_PRODUCT,
        payload
    }
}

export const filterProductByCategory = (payload)=> {
    return {
        type: FILTER_PRODUCT_BY_CATEGORY,
        payload
    }
}

