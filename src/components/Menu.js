import React from 'react'
import styled from 'styled-components'
import Fade from 'react-reveal/Fade'

import IconContainer from './IconContainer'
import MenuTitle from './MenuTitle'

const MenuContainer = styled.div`
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`

const Menu = ({ screenActive, setScreenActive, setFiles }) => {
    const renderMenuTitle = str => <MenuTitle>{str}</MenuTitle>

    return (
        <MenuContainer>
            <IconContainer
                icon='file-csv'
                screenActive={screenActive === 'Content Injection' ? true : false}
                onClick={() => {
                    setScreenActive('Content Injection')
                    setFiles([])
                }}
            />

            <IconContainer
                icon={['fab', 'jira']}
                screenActive={screenActive === 'Create Jira' ? true : false}
                onClick={() => {
                    setScreenActive('Create Jira')
                    setFiles([])
                }}
            />
            {renderMenuTitle(screenActive)}
        </MenuContainer>
    )
}

export default Menu