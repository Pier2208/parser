import React, { useEffect } from 'react'
import styled from 'styled-components'
import DragnDrop from './DragnDrop'
import CustomButton from './Button'
import { ipcRenderer } from 'electron'

import CIHistory from './CIHistory'
import Menu from './Menu'


const MainContainer = styled.div`
  display: flex;
  justify-content: space-around;
`
const ContainerViews = styled.div`
  display: flex;
  flex-direction: column;
  width: 55%;
`
const Buttons = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 90%;
`

const ContentInjectionHome = ({ store, files, setFiles, processing, setProcessing, screenTitle, ...routerProps }) => {
    const handleNewXlsxToCsvDoneListener = (e, fileObj) => {
        setProcessing(false)
        setFiles([])
    }

    useEffect(() => {
        ipcRenderer.on('new-xlsx-to-csv-done', handleNewXlsxToCsvDoneListener)
        return () => ipcRenderer.removeListener('new-xlsx-to-csv-done', handleNewXlsxToCsvDoneListener)
    }, [])

    const handleSubmit = async () => {
        if (files.length > 0) {
            await setProcessing(true)
            const filepath = files[0].path
            ipcRenderer.send('new-xlsx-to-csv', filepath)
        }
    }

    const reset = () => {
        setFiles([])
        setProcessing(false)
    }

    return (
        <MainContainer>
            <CIHistory store={store} />
            <ContainerViews>
                <Menu setFiles={setFiles} screenTitle={screenTitle} path={routerProps.location.pathname} />
                <DragnDrop
                    setFiles={setFiles}
                    files={files}
                    acceptedFileTypes='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                />
                <Buttons>
                    {
                        files.length > 0
                        && <CustomButton color='reset' onClick={reset}>Cancel</CustomButton>
                    }
                    <CustomButton
                        color='process'
                        onClick={handleSubmit}
                        disabled={processing || files.length === 0}
                    >{processing ? 'Processing' : 'CREATE CSV'}
                    </CustomButton>
                </Buttons>
            </ContainerViews>
        </MainContainer>
    )
}

export default ContentInjectionHome