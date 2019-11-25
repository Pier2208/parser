import React from 'react'
import styled from 'styled-components'

import IconContainer from './IconContainer'
import MenuTitle from './MenuTitle'

const MenuContainer = styled.div`
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`

const Menu = ({ setFiles, screenTitle, path }) => {
    const renderMenuTitle = str => <MenuTitle>{str}</MenuTitle>

    return (
        <MenuContainer>
            <IconContainer
                icon='file-csv'
                to='/'
                isActive={path === '/'}
                onClick={() => {
                    setFiles([])
                }}
            />

            <IconContainer
                icon={['fab', 'jira']}
                to='/jira'
                isActive={path === '/jira'}
                onClick={() => {
                    setFiles([])
                }}
            />
            {renderMenuTitle(screenTitle)}
        </MenuContainer>
    )
}

export default Menu