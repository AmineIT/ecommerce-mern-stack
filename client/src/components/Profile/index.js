import React from 'react'
import { Box, Grid, GridItem, Heading, Divider, Text, useColorModeValue, Button, useColorMode, Flex, Spacer } from '@chakra-ui/react'
import { isAuth } from '../../utils/helpers'
import { Link } from 'react-router-dom'

const ProfileComponent = () => {

    const { user: { name, email, role } } = isAuth()
    const bg = useColorModeValue("#f9f9f9", "gray.900")
    const btnBG = useColorModeValue("gray.900", "#f9f9f9")
    const color = useColorModeValue("#333333", "white")
    const btnColor = useColorModeValue("white", "#333333")
    const borderColor = useColorModeValue("#d2d2d2", "#4A5568")
    const { colorMode } = useColorMode()

    return (
        <Box
            p={["60px"]}
        >
            <Flex
                alignItems="center"
                justifyContent="space-between"
                mb="32px"
            >
                <Heading fontWeight="400">Welcome {name} to your dashboard</Heading>
                <Spacer />
                {isAuth().user.role === 1 && (
                    <Link to="/product/create">
                        <Button
                            _hover={{
                                backgroundColor: colorMode === 'light' ? 'gray.900' : 'white',
                                color: colorMode === 'light' ? 'white' : '#333333',
                            }}
                            bg={btnBG}
                            color={btnColor}
                        >Create Product</Button>
                    </Link>
                )}
            </Flex>
            <Grid
                templateColumns={["repeat(4 ,1fr)"]}
                gap={10}
            >
                <Box
                    bg={bg}
                    color={color}
                    p="32px"
                    borderRadius="4px"
                    border="1px solid"
                    borderColor={borderColor}
                >
                    <Heading fontSize="18px" fontWeight="500" mb="16px">Purshase History</Heading>
                    <Divider />
                    <Box mt="16px">
                        <Text fontWeight="500">You don't have any purshase yet.</Text>
                    </Box>
                </Box>
                <GridItem
                    gridColumn={["span 3 / auto"]}
                    bg={bg}
                    color={color}
                    p="32px"
                    borderRadius="4px"
                    border="1px solid"
                    borderColor={borderColor}
                >
                    <Heading fontSize="18px" fontWeight="500" mb="16px">My Profile</Heading>
                    <Divider />
                    <Box mt="16px">
                        <Text fontWeight="500">Display name: {name}</Text>
                    </Box>
                    <Box mt="16px">
                        <Text fontWeight="500">Email address: {email}</Text>
                    </Box>
                    <Box mt="16px">
                        <Text fontWeight="500">User role: {role ? 'Admin' : 'User'}</Text>
                    </Box>
                    <Button
                        _hover={{
                            backgroundColor: colorMode === 'light' ? 'gray.900' : 'white',
                            color: colorMode === 'light' ? 'white' : '#333333',
                        }}
                        mt="24px"
                        w="100%"
                        bg={btnBG}
                        color={btnColor}>Edit Profile</Button>
                </GridItem>
                <GridItem
                    gridColumn={["span 4 / auto"]}
                    bg={bg}
                    color={color}
                    p="32px"
                    borderRadius="4px"
                    border="1px solid"
                    borderColor={borderColor}
                >
                    <Heading fontSize="18px" fontWeight="500" mb="16px">Payment Details</Heading>
                    <Divider />
                    <Box mt="16px">
                        <Text fontWeight="500">You don't have any payment details yet.</Text>
                    </Box>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default ProfileComponent
