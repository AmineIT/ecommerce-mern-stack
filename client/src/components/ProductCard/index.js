import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Heading, Flex, Badge, Grid, Button } from '@chakra-ui/react'
import ShowImage from '../../utils/ShowImage'
import { BsFillStarFill } from 'react-icons/bs'

const ProductCard = ({ products, title }) => {
    return (
        <Box py={["60px"]}>
            <Heading fontWeight="400" fontSize="26px" mb="32px">{title}</Heading>

            <Grid
                templateColumns={["repeat(3 ,1fr)"]}
                gap={5}
            >
                {products && products.map(product => (
                    <Box key={product._id} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
                        <ShowImage item={product} url="product-photo" width="100%" height="250px" />
                        <Box p="6">
                            <Flex alignItems="baseline">
                                <Box
                                    color="gray.500"
                                    fontWeight="semibold"
                                    letterSpacing="wide"
                                    fontSize="xs"
                                    textTransform="uppercase"
                                >
                                    <Badge borderRadius="full" px="2" colorScheme="teal">{product.sold} Solds</Badge>
                                </Box>
                            </Flex>

                            <Box
                                mt="1"
                                fontWeight="semibold"
                                as="h4"
                                lineHeight="tight"
                                isTruncated
                            >
                                {product.name}
                            </Box>

                            <Box>
                                ${product.price} /
                                <Box as="span" textDecoration="line-through" >
                                    ${product.price + 250}
                                </Box>
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
                                <Box as="span" ml="2" color="gray.600" fontSize="sm">
                                    34 reviews
                                </Box>
                            </Box>
                            <Box
                                color="gray.500"
                                fontWeight="semibold"
                                letterSpacing="wide"
                                fontSize="xs"
                                textTransform="uppercase"
                            >
                                <Badge borderRadius="full" px="2" colorScheme="teal">{product.quantity} in stock</Badge>
                            </Box>
                            <Box
                                mt="16px"
                            >
                                <Link style={{ textDecoration: 'none' }} to={`/product/${product._id}`}>
                                    <Button size="sm" colorScheme="teal" mr="8px">See Product</Button>
                                </Link>
                                <Button size="sm" colorScheme="teal" variant="ghost">Add To Cart</Button>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Grid>
        </Box>
    )
}

export default ProductCard