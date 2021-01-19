import React from 'react'
import { Box, Heading, Flex, Badge, Grid } from '@chakra-ui/react'
import ShowImage from '../../utils/ShowImage'
import { BsFillStarFill } from 'react-icons/bs'

const ProductCard = ({ products, title, cardType }) => {
    return (
        <Box py={["60px"]}>
            <Heading fontWeight="400" fontSize="32px" mb="32px">{title}</Heading>

            <Grid
                templateColumns={["repeat(4 ,1fr)"]}
                gap={10}
            >
                {products && products.map(product => (
                    <Box key={product._id} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
                        <ShowImage item={product} url="product-photo" />
                        <Box p="6">
                            <Flex alignItems="baseline">
                                <Badge borderRadius="full" px="2" colorScheme="teal">{cardType}</Badge>
                                <Box
                                    color="gray.500"
                                    fontWeight="semibold"
                                    letterSpacing="wide"
                                    fontSize="xs"
                                    textTransform="uppercase"
                                    ml="2"
                                >
                                    {product.sold} Solds &bull; {product.quantity} Quantity
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

                            <Box d="flex" mt="2" alignItems="center">
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
                        </Box>
                    </Box>
                ))}
            </Grid>
        </Box>
    )
}

export default ProductCard