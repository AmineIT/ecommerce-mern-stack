import React, { useEffect, useState } from 'react'
import { getCategories } from '../../utils/APIs'
import { Box, Checkbox } from '@chakra-ui/react';

const FilterByCategory = ({ handleFilters }) => {

    const [categories, setCategories] = useState([])
    const [checked] = useState(new Set())

    const handleChecked = (id) => {
        if (checked.has(id)) {
            checked.delete(id)
        } else {
            checked.add(id)
        }
        handleFilters(Array.from(checked))
    }

    useEffect(() => {
        getCategories().then(res => setCategories(res)).catch(error => console.log(error))
    }, [])

    return (<>
        {categories && categories.map(category => {
            return (
                <Box key={category._id}>
                    <Checkbox onChange={() => handleChecked(category._id)} color="white" value={category._id} size="lg">
                        {category.name}
                    </Checkbox>
                </Box>
            )
        })}
    </>)
}

export default FilterByCategory
