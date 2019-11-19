import React, { useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'
import { library } from '@fortawesome/fontawesome-svg-core'
import styled from 'styled-components'
import GlobalStyle from './globalStyles'
import Store from 'electron-store'


import Header from './Header'
import CIHistory from './CIHistory'
import ContentInjectionHome from './ContentInjectionHome'
import JiraHome from './JiraHome'
import JiraHistory from './JiraHistory'
import Menu from './Menu'
import Modal from './Modal'
import Spinner from './Spinner'

// create new data store
const store = new Store()
//store.delete('csv')
// store.delete('jira)

//fontawesome library
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faJira } from '@fortawesome/free-brands-svg-icons'
library.add(fas, faJira)

const MainContainer = styled.div`
  display: flex;
  justify-content: space-around;
`
const ContainerViews = styled.div`
  display: flex;
  flex-direction: column;
  width: 55%;
`

const App = () => {
  const [screenActive, setScreenActive] = useState('Content Injection')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState('')
  const [files, setFiles] = useState([])
  const [processing, setProcessing] = useState(false)

  const handleNewJiraErrorListener = (e, msg) => {
    setError(msg)
    setIsModalOpen(true)
    store.delete('JiraPassword')
    setProcessing(false)
  }

  useEffect(() => {
    ipcRenderer.on('new-jira-error', handleNewJiraErrorListener)
    return () => ipcRenderer.removeListener('new-jira-error', handleNewJiraErrorListener)
  }, [error])

  return (
    <>
      <Header />
      <MainContainer>
        {screenActive === 'Content Injection' &&
          <CIHistory store={store} />
        }
        {screenActive === 'Create Jira' &&
          <JiraHistory store={store} />
        }
        <ContainerViews>
          {isModalOpen &&
            <Modal
              setIsModalOpen={setIsModalOpen}
              isModalOpen={isModalOpen}
              store={store}
              error={error}
              setError={setError}
              files={files}
              setFiles={setFiles}
              processing={processing}
              setProcessing={setProcessing}
            />}
          {processing && <Spinner />}
          <GlobalStyle />

          <Menu screenActive={screenActive} setScreenActive={setScreenActive} setFiles={setFiles} />
          {screenActive === 'Content Injection' &&
            <ContentInjectionHome
              processing={processing}
              setProcessing={setProcessing}
              files={files}
              setFiles={setFiles}
            />}
          {screenActive === 'Create Jira' &&
            <JiraHome
              setIsModalOpen={setIsModalOpen}
              store={store}
              files={files}
              setFiles={setFiles}
              processing={processing}
              setProcessing={setProcessing}
            />}
        </ContainerViews>
      </MainContainer>
    </>
  )
}

export default App