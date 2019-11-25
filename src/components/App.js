import React, { useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'
import { library } from '@fortawesome/fontawesome-svg-core'
import { HashRouter as Router, Route } from 'react-router-dom'
import GlobalStyle from './globalStyles'
import Store from 'electron-store'


import Header from './Header'
import ContentInjectionHome from './ContentInjectionHome'
import JiraHome from './JiraHome'
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


const App = () => {
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
    <Router>
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

      <Header />
      <Route
        exact
        path='/'
        render={(props) =>
          <ContentInjectionHome {...props}
            screenTitle='Content Injection'
            store={store}
            files={files}
            processing={processing}
            setProcessing={setProcessing}
            setFiles={setFiles} />}
      />
      <Route
        path='/jira'
        render={(props) =>
          <JiraHome {...props}
            screenTitle='Jira'
            store={store}
            files={files}
            setFiles={setFiles}
            setIsModalOpen={setIsModalOpen}
            processing={processing}
            setProcessing={setProcessing}
          />}
      />
    </Router>
  )
}

export default App