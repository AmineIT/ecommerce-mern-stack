import React, { useState, useEffect } from 'react'
import Slider from 'react-animated-slider'
import 'react-animated-slider/build/horizontal.css'
import { getProducts } from '../../utils/APIs'
import { Box, Heading, Text, Badge, Button } from '@chakra-ui/react';

const SliderComponent = () => {

    const [products, setProducts] = useState([])

    const fetchBestSellers = () => {
        getProducts({ sortBy: 'createdAt', order: 'desc', limit: 3 })
            .then(res => setProducts(res))
            .catch(error => console.log(error))
    }

    useEffect(() => fetchBestSellers(), [])

    return (
        <Slider
            autoplay={3000}
            nextButton={false}
            previousButton={false}
        >
            {products && products.map((product, i) => (
                <Box
                    key={i}
                    bg={`url(http://localhost:8000/api/product/product-photo/${product._id}) no-repeat center center`}
                    bgSize="cover"
                >
                    <Box
                        pos="absolute"
                        left="0"
                        top="0"
                        w="100%"
                        h="100%"
                        bg="rgba(0, 0, 0, 0.20)"
                        zIndex="50" />
                    <Box
                        p={["60px"]}
                    >
                        <Heading
                            fontWeight="400"
                            fontSize="28px"
                            color="black"
                        >
                            New Arrivals
                        </Heading>
                        <Heading
                            color="black"
                            mb="16px"
                            isTruncated
                        >
                            {product.name}
                        </Heading>
                        <Badge
                            borderRadius="full"
                            px="4"
                            fontSize="lg"
                            bg="gray.800"
                            color="white"
                            mb="16px"
                        >
                            ${product.price} / $<Text as="span" textDecoration="line-through">{product.price + 250}</Text>
                        </Badge>
                        <Button
                            display="block"
                            size="lg"
                            bg="gray.800"
                            color="white"
                            w="200px"
                        >
                            Shop Now
                        </Button>
                    </Box>
                </Box>
            ))}
        </Slider>
    )
}

export default SliderComponent