import axios from 'axios'

export const getProducts = (sortBy, order, limit) => {
    return axios.get(`/api/product?sortBy=${sortBy}&order=${order}&limit=${limit}`)
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