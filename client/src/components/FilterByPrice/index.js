import React from 'react'
import { Stack, Radio, RadioGroup } from '@chakra-ui/react'

const FilterByPrice = ({ handleFilters }) => {

    const prices = [
        {
            id: 1,
            name: 'Any',
            value: []
        },
        {
            id: 2,
            name: '$0 to $100',
            value: [0, 100]
        },
        {
            id: 3,
            name: '$101 to $500',
            value: [101, 500]
        },
        {
            id: 4,
            name: '$501 to $1000',
            value: [501, 1000]
        },
        {
            id: 5,
            name: 'More',
            value: [1001, 999999]
        }
    ]

    const handlePrice = (e) => {
        handleFilters(prices[e]['value'])
    }

    return (
        <RadioGroup
            color="white"
            name="price"
            onChange={handlePrice}
            defaultValue="0">
            <Stack direction="column">
                {
                    prices.map((price, i) => (
                        <Radio
                            key={price.id}
                            value={`${i}`}
                            size="md"
                            colorScheme="blue"
                        >
                            {price.name}
                        </Radio>
                    ))
                }
            </Stack>
        </RadioGroup>
    )
}

export default FilterByPrice
