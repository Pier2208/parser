import React from 'react'
import styled from 'styled-components'
import ScaleLoader from 'react-spinners/ScaleLoader'


const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    background: #fff;
    opacity: 0.8;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Loader = styled(ScaleLoader)`
`


const Spinner = ({ processing }) => (
    <Overlay>
        <Loader
            sizeUnit={"px"}
            size={150}
            color={'#00A6A6'}
            loading={processing}
            height={90}
            width={8}
        />
    </Overlay>
)

export default Spinner