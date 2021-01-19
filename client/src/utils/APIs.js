import axios from 'axios'
import queryString from 'query-string'

export const getProducts = (params) => {

    let query = queryString.stringify(params)

    return axios.get(`/api/product?${query}`)
        .then(res => res.data)
        .catch(error => console.log(error))
}

export const getSingleProduct = (id) => {
    return axios.get(`/api/product/${id}`)
        .then(res => res.data)
        .catch(error => console.log(error))
}

export const relatedProducts = (id) => {
    return axios.get(`/api/product/related-products/${id}`)
        .then(res => res.data)
        .catch(error => console.log(error))
}

export const getCategories = () => {
    return axios.get('/api/category', {
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }).then(res => res.data)
        .catch(error => console.log(error))
}

export const filterProducts = (skip, limit, filters) => {

    const data = {
        skip,
        limit,
        filters
    }

    return axios.post('/api/product/search', data, {
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }).then(res => res.data)
        .catch(error => console.log(error))
}