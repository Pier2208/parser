import React from 'react'
import styled from 'styled-components'

const Title = styled.h2`
    color: #cccccc;
    margin-left: auto;
    font-size: 2rem;
    padding: 0.4rem .7rem;
`

const MenuTitle = ({ children }) => <Title>{children}</Title>

export default MenuTitle