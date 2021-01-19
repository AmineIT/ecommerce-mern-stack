import React, { useState, useEffect } from 'react'
import { getProducts } from '../../utils/APIs'
import ProductCard from '../ProductCard'

const BestSellerProductsComponent = () => {

    const [products, setProducts] = useState([])

    const fetchBestSellers = () => {
        getProducts('sold', 'desc', 3)
            .then(res => setProducts(res))
            .catch(error => console.log(error))
    }

    useEffect(() => fetchBestSellers(), [])

    return (
        <ProductCard products={products} title="Best Selling Products" cardType="Best Selling" />
    )
}

export default BestSellerProductsComponent