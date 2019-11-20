import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tada from 'react-reveal/Tada'
import Fade from 'react-reveal/Fade'

import AppVersion from './AppVersion'

const MainContainer = styled.div`
    width: 100vw;
    height: 3.5rem;
    padding: 1rem;
    background-color: #00A6A6;  
`

const Inner = styled.div`
    display: flex;
    align-items: center;
    width: 90%;
    height: 100%;
    margin: 0 auto;
    position: relative;
`

const Icon = styled(FontAwesomeIcon)`
    font-size: 1.7rem;
    color: #fff;
    margin-right: .8rem;
`

const HeaderTitle = styled.h1`
    margin: 0;
    font-size: 1.4rem;
    color: #FBF5F3;
    text-transform: uppercase;
`
const Header = () => (
    <MainContainer>
        <Inner>
            <Tada><Icon icon='tools' /></Tada>
           <Fade><HeaderTitle>Parser Tool Belt</HeaderTitle></Fade>
            <AppVersion />
        </Inner>
    </MainContainer>
)

export default Header