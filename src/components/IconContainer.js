import React from 'react'
import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.5rem;
    width: 2.5rem;
    background-color: #cccccc;
    border-radius: 50%;
    margin-right: 1.3rem;
    cursor: pointer;
    transition: all .3s ease-in-out;
    ${({ screenActive }) => screenActive && css`
        background-color: #FFAE03;
        transform: scale(1.4) rotateY(180deg);
    `}
`
const Icon = styled(FontAwesomeIcon)`
    font-size: 1.6rem;
    color: #fff;
    transition: transform .3s;
    ${({ screenActive }) => screenActive && css`
        background-color: #FFAE03;
        transform: rotateY(180deg);
    `}
`

const IconContainer = ({ onClick, icon, screenActive }) => {
    return (
        <Container
            onClick={onClick}
            screenActive={screenActive}
        >
            <Icon icon={icon} screenActive={screenActive} />
        </Container>
    )

}

export default IconContainer