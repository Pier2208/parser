import React from 'react'
import { remote } from 'electron'
import styled from 'styled-components'

const Version = styled.span`
    color: #fff;
    font-size: .7rem;
    position: absolute;
    bottom: 0;
    right: 0 ;
`

const AppVersion = () => <Version>v{remote.app.getVersion()}</Version>

export default AppVersion