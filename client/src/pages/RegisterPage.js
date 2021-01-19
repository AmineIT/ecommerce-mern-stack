import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Input, Box, Heading, Flex, FormControl, Button, Image, Text, useColorModeValue, createStandaloneToast } from '@chakra-ui/react'
import Asset from '../assets/shops.svg'
import axios from 'axios'

const RegisterPage = ({ history }) => {

    const bg = useColorModeValue("blue.200", "gray.900")
    const color = useColorModeValue("gray.600", "white")

    const toast = createStandaloneToast()

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {

        e.preventDefault()
        const data = JSON.stringify(user)

        axios.post('/api/signup', data, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (res.data) {
                    toast({
                        title: "Account created.",
                        description: "We've created your account for you.",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    })
                    history.push('/login')
                }
            })
            .catch(res => {
                const { error } = res.response.data
                if (error) {
                    toast({
                        title: error,
                        description: "Unable to create user account.",
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
                <Box
                    p="60px 40px"
                    textAlign="center"
                >
                    <Heading color="white">A few clicks away from creating your account.</Heading>
                    <Box m="40px auto" w="30%">
                        <Image src={Asset} />
                    </Box>
                </Box>
            </Flex>
            <Flex
                w={["70%"]}
                h={['100%']}
                alignItems="center"
            >
                <Box as="form" onSubmit={handleSubmit} p="60px 40px" w={["50%"]}>
                    <Box mb="16px">
                        <Heading
                            color={color}
                            fontSize="32px"
                            mb="8px"
                        >Register</Heading>
                    </Box>

                    <FormControl id="first-name" mb="24px">
                        <Input
                            variant="flushed"
                            name="name"
                            onChange={handleChange}
                            placeholder="Your full name" />
                    </FormControl>

                    <FormControl id="email" mb="24px">
                        <Input
                            variant="flushed"
                            name="email"
                            onChange={handleChange}
                            type="email"
                            placeholder="Your email address" />
                    </FormControl>

                    <FormControl id="password" mb="24px">
                        <Input
                            variant="flushed"
                            name="password"
                            onChange={handleChange}
                            type="password"
                            placeholder="Your password" />
                    </FormControl>

                    <Button
                        w="100%"
                        type="submit"
                        bg="gray.900"
                        mb={["40px"]}
                        _hover={{
                            backgroundColor: 'gray.900'
                        }}
                        color="white">Create Account</Button>

                    <Text>
                        Have already an account?
                        <Link to="/login">
                            <Text as="span" fontWeight="500" color="blue.400"> Log in</Text>
                        </Link>
                    </Text>
                </Box>
            </Flex>
        </Flex>
    )
}

export default RegisterPage
