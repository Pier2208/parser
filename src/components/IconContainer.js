import React from 'react'
import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import Bounce from 'react-reveal/Bounce'


const Container = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.5rem;
    width: 2.5rem;
    background-color: #cccccc;
    border-radius: 50%;
    margin-right: 1.3rem;
    cursor: pointer;
    text-decoration: none;
    outline: none;
    transition: all .3s ease-in-out;
    ${({ isActive }) => isActive && css`
        background-color: #e2574c;
        transform: scale(1.4);
    `}
`
const Icon = styled(FontAwesomeIcon)`
    font-size: 1.6rem;
    color: #fff;
    transition: transform .3s;
    ${({ isActive }) => isActive && css`
        background-color: #e2574c;
    `}
`

const IconContainer = ({ onClick, icon, to, isActive }) => (
    isActive ?
        <Bounce>
            <Container
                to={to}
                onClick={onClick}
                isActive={isActive}
            >
                <Icon icon={icon} />
            </Container>
        </Bounce> :
        <Container
            to={to}
            onClick={onClick}
            isActive={isActive}
        >
            <Icon icon={icon} />
        </Container>

)

export default IconContainer