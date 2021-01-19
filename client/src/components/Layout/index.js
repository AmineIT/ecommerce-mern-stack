import React from 'react'
import PropTypes from 'prop-types'
import Menu from '../Menu'

const Layout = ({ children }) => {
    return (
        <>
            <Menu />
            {children}
        </>
    )
}

Layout.protoTypes = {
    children: PropTypes.node
}

export default Layout