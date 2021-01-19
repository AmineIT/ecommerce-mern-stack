import React from 'react'
import { Image } from '@chakra-ui/react'

const ShowImage = ({ item, url }) => {
    return (
        <>
            <Image w="350px" h="250px" src={`http://localhost:8000/api/product/${url}/${item._id}`} alt={item.name} fallbackSrc="https://via.placeholder.com/150" />
        </>
    )
}

export default ShowImage
