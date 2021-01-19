import React, { useState, useEffect } from 'react'
import { getProducts } from '../../utils/APIs'
import ProductCard from '../ProductCard';

const NewProductsComponent = () => {

    const [products, setProducts] = useState([])

    const fetchBestSellers = () => {
        getProducts('createdAt', 'desc', 3)
            .then(res => setProducts(res))
            .catch(error => console.log(error))
    }

    useEffect(() => fetchBestSellers(), [])

    return (
        <ProductCard products={products} title="New Added Products" cardType="New Items" />
    )
}

export default NewProductsComponent