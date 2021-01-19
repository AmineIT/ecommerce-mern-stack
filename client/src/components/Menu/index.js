import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Flex, Box, Heading, Spacer, Button, createStandaloneToast, useColorMode } from '@chakra-ui/react'
import { isAuth } from '../../utils/helpers'
import { IoLogInOutline } from 'react-icons/io5'
import { BiMoon } from 'react-icons/bi'
import { RiSunLine } from 'react-icons/ri'
import axios from 'axios'

const Menu = () => {

    const history = useHistory()
    const toast = createStandaloneToast()
    const { colorMode, toggleColorMode } = useColorMode()

    const logout = () => {
        axios.get('/api/logout').then(res => {
            if (res.data) {
                toast({
                    title: res.data.message,
                    description: "You've logged out from your account.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                })
                localStorage.removeItem('jwt-info')
                history.push('/login')
            }
        }).catch(error => console.log(error))
    }

    return (
        <Flex
            bg="gray.900"
            px={["1em", "1em", "60px"]}
            h={["80px"]}
            color="white"
            alignItems="center">
            <Box p="2">
                <Link to="/">
                    <Heading fontWeight="300" size="md">Crown Shop</Heading>
                </Link>
            </Box>
            <Spacer />
            <Box>
                <Button
                    size="sm"
                    _hover={{
                        color: 'white',
                        backgroundColor: 'gray.800'
                    }}
                    variant="ghost"
                    color="white"
                    px="6"
                    onClick={toggleColorMode}
                >
                    {colorMode === 'light' ? (
                        <BiMoon size="20" />
                    ) : (
                            <RiSunLine size="20" />
                        )}

                </Button>
                <Link to="/">
                    <Button
                        size="sm"
                        _hover={{
                            color: 'white',
                            backgroundColor: 'gray.800'
                        }}
                        variant="ghost"
                        color="white"
                        px="6">Shop</Button>
                </Link>
                {isAuth() && (
                    <>
                        <Link to="/cart">
                            <Button
                                size="sm"
                                _hover={{
                                    color: 'white',
                                    backgroundColor: 'gray.800'
                                }}
                                variant="ghost"
                                color="white"
                                px="6">Cart</Button>
                        </Link>
                        <Link to="/profile">
                            <Button
                                size="sm"
                                _hover={{
                                    color: 'white',
                                    backgroundColor: 'gray.800'
                                }}
                                variant="ghost"
                                color="white"
                                px="6">Profile</Button>
                        </Link>
                    </>
                )}
                {!isAuth() && (
                    <>
                        <Link to="/register">
                            <Button
                                size="sm"
                                _hover={{
                                    color: 'white',
                                    backgroundColor: 'gray.800'
                                }}
                                variant="ghost"
                                color="white"
                                px="6">Register</Button>
                        </Link>
                        <Link to="/login">
                            <Button
                                _hover={{
                                    backgroundColor: 'gray.900'
                                }}
                                size="sm"
                                leftIcon={<IoLogInOutline size="20" />}
                                ml="6"
                                variant="outline"
                                color="white">Log in</Button>
                        </Link>
                    </>
                )}

                {isAuth() && (
                    <>
                        <Button
                            _hover={{
                                backgroundColor: 'gray.900'
                            }}
                            size="sm"
                            ml="6"
                            variant="outline"
                            onClick={logout}
                            color="white">Logout</Button>
                    </>
                )}
            </Box>
        </Flex>
    )
}

export default Menu