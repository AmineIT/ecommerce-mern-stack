import React, { useState, useEffect } from 'react'
import { isAuth } from '../../utils/helpers'
import { getCategories } from '../../utils/APIs'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import {
    Heading,
    Container,
    FormControl,
    Input,
    Textarea,
    FormLabel,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Select,
    Button,
    useColorModeValue,
    useColorMode,
    createStandaloneToast
} from '@chakra-ui/react'

const CreateProductComponent = () => {

    const history = useHistory()
    const btnBG = useColorModeValue("gray.900", "#f9f9f9")
    const btnColor = useColorModeValue("white", "#333333")
    const { colorMode } = useColorMode()
    const toast = createStandaloneToast()
    const [formData, setFormData] = useState(new FormData())
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: 0,
        quantity: 0,
        category: '',
        photo: ''
    })
    const { user, token } = isAuth()
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories().then(res => setCategories(res)).catch(error => console.log(error))
    }, [])

    const handleChange = (e) => {
        const name = e.target.name
        const value = name === 'photo' ? e.target.files[0] : e.target.value
        formData.set(name, value)
        setProduct({ ...product, [name]: value })
    }

    const handleSubmit = () => {

        axios.post(`/api/product/create/${user._id}`, formData, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.data) {
                    toast({
                        title: "Product Created.",
                        description: "We've created a new product for you.",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    })
                    setProduct({
                        name: '',
                        description: '',
                        price: 0,
                        quantity: 0,
                        category: '',
                        photo: ''
                    })
                    setFormData(new FormData())
                    history.push('/')
                }
            })
            .catch(res => {
                const { error } = res.response.data
                if (error) {
                    toast({
                        title: error,
                        description: "Unable to create your new product.",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    })
                }
            })

    }

    return (
        <Container textAlign="center" py={["40px"]}>
            <Heading fontWeight="400">Let's create your product</Heading>

            <FormControl
                id="title"
                mt="32px"
                isRequired
            >
                <FormLabel>Product Title</FormLabel>
                <Input
                    variant="flushed"
                    name="name"
                    onChange={handleChange}
                    value={product.name}
                    placeholder="Product Title" />
            </FormControl>


            <FormControl
                id="description"
                mt="32px"
                isRequired
            >
                <FormLabel>Product Description</FormLabel>
                <Textarea
                    minH="200px"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    placeholder="Product Description" />
            </FormControl>


            <FormControl
                id="price"
                mt="32px"
                isRequired
            >
                <FormLabel>Product Price</FormLabel>
                <Input
                    variant="flushed"
                    name="price"
                    onChange={handleChange}
                    value={product.price}
                    placeholder="Product Price" />
            </FormControl>


            <FormControl
                id="quantity"
                mt="32px"
                isRequired
            >
                <FormLabel>Product Quantity</FormLabel>
                <NumberInput
                    defaultValue={0}
                >
                    <NumberInputField
                        name="quantity"
                        onChange={handleChange}
                        value={product.quantity} />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </FormControl>

            <FormControl
                id="phone"
                mt="32px"
                isRequired
            >
                <FormLabel>Product Photo</FormLabel>
                <Input
                    variant="flushed"
                    name="photo"
                    onChange={handleChange}
                    type="file" />
            </FormControl>

            <FormControl
                id="category"
                mt="32px"
                isRequired
            >
                <FormLabel>Product Category</FormLabel>
                <Select
                    name="category"
                    onChange={handleChange}
                    value={product.category}
                    placeholder="Select Category"
                >
                    {categories && categories.map(category => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </Select>
            </FormControl>

            <Button
                onClick={handleSubmit}
                w="100%"
                mt="32px"
                bg={btnBG}
                color={btnColor}
                _hover={{
                    backgroundColor: colorMode === 'light' ? 'gray.900' : 'white',
                    color: colorMode === 'light' ? 'white' : '#333333',
                }}
            >
                Create Product
            </Button>
        </Container>
    )
}

export default CreateProductComponent
