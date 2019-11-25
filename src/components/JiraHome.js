import React, { useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'
import styled from 'styled-components'
import DragnDrop from './DragnDrop'
import CustomButton from './Button'

import JiraHistory from './JiraHistory'
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


const JiraHome = ({ setIsModalOpen, files, setFiles, store, processing, setProcessing, screenTitle, ...routerProps }) => {
    const handleNewJiraSuccessListener = (e, fileObj) => {
        setProcessing(false)
        setFiles([])
    }

    useEffect(() => {
        ipcRenderer.on('new-jira-success', handleNewJiraSuccessListener)
        return () => ipcRenderer.removeListener('new-jira-success', handleNewJiraSuccessListener)
    }, [])

    const handleSubmit = () => {
        const password = store.get('JiraPassword') ? store.get('JiraPassword') : null
        if (files.length > 0) {
            if (password === null || password === undefined) {
                setIsModalOpen(true)
                return
            }
            setProcessing(true)
            // create JIRA
            const data = {
                filename: files[0].name,
                filepath: files[0].path,
                password
            }
            ipcRenderer.send('new-jira', data)
        }
    }

    const reset = () => {
        setFiles([])
        setProcessing(false)
    }

    return (
        <MainContainer>
            <JiraHistory store={store} />
            <ContainerViews>
                <Menu setFiles={setFiles} screenTitle={screenTitle} path={routerProps.location.pathname} />
                <DragnDrop
                    setFiles={setFiles}
                    files={files}
                    acceptedFileTypes=''
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
                    >{processing ? 'Processing' : 'CREATE JIRA'}
                    </CustomButton>
                </Buttons>
            </ContainerViews>
        </MainContainer>
    )
}

export default JiraHome