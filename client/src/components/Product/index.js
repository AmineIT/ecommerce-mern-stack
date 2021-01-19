import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getSingleProduct, relatedProducts } from '../../utils/APIs'
import ShowImage from '../../utils/ShowImage'
import { Box, Heading, Flex, Text, Badge, Button } from '@chakra-ui/react'
import { BsFillStarFill } from 'react-icons/bs'
import ProductCard from '../ProductCard'

const ProductComponent = () => {

    const { id } = useParams()
    const [product, setProduct] = useState()
    const [related, setRelated] = useState([])

    useEffect(() => {
        getSingleProduct(id)
            .then(res => {
                setProduct(res)
                return relatedProducts(id)
            })
            .then(res => setRelated(res))
            .catch(error => console.log(error))
    }, [id])

    return (
        <>
            {
                product && Object.keys(product).length > 0 && (
                    <Box
                        p={["60px"]}
                    >
                        <Flex
                            alignItems="start"
                        >
                            <Box
                                borderRadius="lg"
                                w="400px"
                                h="600px"
                                border="1px solid"
                                borderColor="gray.500"
                                overflow="hidden"
                                mr="60px"
                            >
                                <ShowImage item={product} url="product-photo" width="100%" height="100%" />
                            </Box>
                            <Box
                                bg="gray.900"
                                border="1px solid"
                                borderColor="gray.500"
                                p="32px"
                                flex="1 1 auto"
                                borderRadius="lg"
                            >
                                <Flex
                                    alignItems="center"
                                    justifyContent="space-between">
                                    <Heading fontSize="26px" color="white">
                                        {product.name} <Badge borderRadius="full" p="1" colorScheme="teal"> {product.sold} Solds</Badge>
                                    </Heading>
                                    <Heading fontSize="26px" color="white">
                                        ${product.price}/
                                        <Box as="span" fontSize="sm" textDecoration="line-through" >${product.price + 250}</Box>
                                    </Heading>
                                </Flex>

                                <Box as="span" color="gray.300" fontSize="sm">
                                    Category: {product.category.name}
                                </Box>

                                <Box d="flex" my="2" alignItems="center">
                                    {Array(5)
                                        .fill("")
                                        .map((_, i) => (
                                            <BsFillStarFill
                                                key={i}
                                                color={i < 4 ? "#319795" : "#CBD5E0"}
                                            />
                                        ))}
                                    <Box
                                        color="gray.500"
                                        fontWeight="semibold"
                                        letterSpacing="wide"
                                        fontSize="xs"
                                        textTransform="uppercase"
                                        ml="2"
                                    >
                                        34 reviews &bull; {product.quantity} in stock
                                    </Box>
                                </Box>

                                <Box my="32px">
                                    <Text fontSize="20px" fontWeight="500" color="white">Product Details:</Text>
                                    <Text color="white" isTruncated>{product.description}</Text>
                                </Box>

                                <Button size="lg" mr="8px">Buy Now</Button>
                                <Button size="lg" variant="outline" color="white">Add To Cart</Button>
                            </Box>
                        </Flex>

                        <Box mt="32px">
                            <ProductCard products={related} title="Related Products" />
                        </Box>
                    </Box>
                )
            }

        </>
    )
}

export default ProductComponent
