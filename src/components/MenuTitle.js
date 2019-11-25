import React from 'react'
import styled from 'styled-components'
import Jump from 'react-reveal/Jump'
import Fade from 'react-reveal/Fade'

const Title = styled.h2`
    color: #cccccc;
    margin-left: auto;
    font-size: 2rem;
    padding: 0.4rem .7rem;
    user-select: none;
`

const MenuTitle = ({ children }) => <Title><Fade><Jump>{children}</Jump></Fade></Title>

export default MenuTitle