import React, { useState } from 'react'
import { InputGroup, InputLeftElement, Input, InputRightAddon } from '@chakra-ui/input'
import { BiSearch } from 'react-icons/bi'
import { getProducts } from '../../utils/APIs'

const SearchProducts = ({ handleSearchData }) => {

    const [searchText, setSearchText] = useState({
        search: ''
    })

    const handleSearch = () => {
        let { search } = searchText
        getProducts({ search: search || undefined })
            .then(res => {
                handleSearchData(res)
            })
            .catch(error => console.log(error))
    }

    return (
        <InputGroup mt="60px">
            <InputLeftElement
                pointerEvents="none"
                children={<BiSearch color="gray.300" />}
            />
            <Input
                type="text"
                onChange={e => setSearchText({ search: e.target.value })}
                placeholder="Search for products" />
            <InputRightAddon
                onClick={handleSearch}
                fontWeight="500"
                cursor="pointer"
                children="Search" />
        </InputGroup>
    )
}

export default SearchProducts
