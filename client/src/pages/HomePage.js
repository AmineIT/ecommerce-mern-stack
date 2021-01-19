import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { Grid, Box, GridItem, Heading, Divider, Button, Center, useColorModeValue, useColorMode } from '@chakra-ui/react'
import FilterByCategory from '../components/FilterByCategory'
import FilterByPrice from '../components/FilterByPrice'
import { filterProducts } from '../utils/APIs'
import SliderComponent from '../components/Slider'
import ProductCard from '../components/ProductCard'

const HomePage = () => {

    const [filters, setFilters] = useState({
        category: [],
        price: []
    })
    const [skip, setSkip] = useState(0)
    const [limit, setLimit] = useState(4)
    const [size, setSize] = useState(0)
    const [filtredProducts, setFiltredProducts] = useState([])
    const btnBG = useColorModeValue("gray.900", "#f9f9f9")
    const btnColor = useColorModeValue("white", "#333333")
    const { colorMode } = useColorMode()

    const handleFilters = (data, filterBy) => {
        setFilters({ ...filters, [filterBy]: data })
    }

    useEffect(() => {
        filterProducts(skip, limit, filters)
            .then(res => {
                setFiltredProducts(res)
                setSkip(0)
                setSize(res.length)
            })
            .catch(error => console.log(error))
    }, [filters])

    const loadMore = () => {
        const toSkip = skip + limit
        filterProducts(toSkip, limit, filters)
            .then(res => {
                setFiltredProducts([...filtredProducts, ...res])
                setSkip(toSkip)
                setSize(res.length)
            })
            .catch(error => console.log(error))
    }

    return (
        <Layout>
            <SliderComponent />
            <Box px={["60px"]}>
                <Grid
                    templateColumns={["repeat(4 ,1fr)"]}
                    gap={10}
                >
                    <Box
                        bg="gray.900"
                        p="24px"
                        my="60px"
                        maxH="470px"
                        borderRadius="lg"
                    >
                        <Box mb="32px">
                            <Heading
                                color="white"
                                fontWeight="300"
                                fontSize="18px"
                                mb="16px"
                            >
                                Filter by categories
                            </Heading>
                            <FilterByCategory handleFilters={(data) => handleFilters(data, 'category')} />
                        </Box>
                        <Divider />
                        <Box mt="32px">
                            <Heading
                                color="white"
                                fontWeight="300"
                                fontSize="18px"
                                mb="16px"
                            >
                                Filter by price
                            </Heading>
                            <FilterByPrice handleFilters={(data) => handleFilters(data, 'price')} />
                        </Box>

                    </Box>
                    <GridItem
                        gridColumn={["span 3 / auto"]}
                    >
                        <ProductCard
                            products={filtredProducts}
                            title={`(${filtredProducts && filtredProducts.length} Products)`}
                        />

                        {
                            size > 0 &&
                            size >= limit && (
                                <Center>
                                    <Button
                                        _hover={{
                                            backgroundColor: colorMode === 'light' ? 'gray.900' : 'white',
                                            color: colorMode === 'light' ? 'white' : '#333333',
                                        }}
                                        bg={btnBG}
                                        color={btnColor}
                                        w="200px"
                                        onClick={loadMore}
                                    >Load Products</Button>
                                </Center>

                            )
                        }
                    </GridItem>
                </Grid>
            </Box>
        </Layout>
    )
}

export default HomePage
