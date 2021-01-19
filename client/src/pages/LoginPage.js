import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Input, Box, Heading, Flex, FormControl, Button, Image, Text, useColorModeValue, createStandaloneToast } from '@chakra-ui/react'
import Asset from '../assets/shops.svg'
import axios from 'axios'

const LoginPage = ({ history }) => {

    const bg = useColorModeValue("blue.200", "gray.900")
    const color = useColorModeValue("gray.600", "white")
    const toast = createStandaloneToast()

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {

        e.preventDefault()
        const data = JSON.stringify(user)

        axios.post('/api/login', data, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (res.data) {
                    toast({
                        title: "Welcome.",
                        description: "You're logged in to your account.",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    })
                    history.push('/')
                    localStorage.setItem('jwt-info', JSON.stringify(res.data))
                }
            })
            .catch(res => {
                const { error } = res.response.data
                if (error) {
                    toast({
                        title: error,
                        description: "Unable to login to your account.",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    })
                }
            })
    }

    return (
        <Flex h={["100vh"]} w={["100vw"]}>
            <Flex
                alignItems="center"
                w={["30%"]}
                h={['100%']}
                bg={bg}
            >
                <Box p="60px 40px" textAlign="center">
                    <Heading color="white">Welcome to your account.</Heading>
                    <Box m="40px auto" w="30%">
                        <Image src={Asset} />
                    </Box>
                </Box>
            </Flex>
            <Flex
                w={["70%"]}
                h={['100%']}
                alignItems="center">
                <Box as="form" onSubmit={handleSubmit} p="60px 40px" w={["50%"]}>
                    <Box mb="16px">
                        <Link to="/">
                            <Text as="span">Go back to shop page</Text>
                        </Link>
                        <Heading color={color} fontSize="32px" my="16px">Log in now!</Heading>
                    </Box>

                    <FormControl id="email" mb="24px">
                        <Input
                            variant="flushed"
                            type="email"
                            name="email"
                            onChange={handleChange}
                            placeholder="Your email address" />
                    </FormControl>

                    <FormControl id="password" mb="24px">
                        <Input
                            variant="flushed"
                            type="password"
                            name="password"
                            onChange={handleChange}
                            placeholder="Your password" />
                    </FormControl>

                    <Button
                        type="submit"
                        w="100%"
                        bg="gray.900"
                        mb={["40px"]}
                        _hover={{
                            backgroundColor: 'gray.900'
                        }}
                        color="white">Create Account</Button>

                    <Text>
                        Don't have an account yet?
                        <Link to="/register">
                            <Text as="span" fontWeight="500" color="blue.400"> Register now.</Text>
                        </Link>
                    </Text>
                </Box>
            </Flex>
        </Flex>
    )
}

export default LoginPage
