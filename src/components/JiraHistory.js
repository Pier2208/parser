import React, { useState, useEffect } from 'react'
const { ipcRenderer } = require('electron')
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import moment from 'moment'
import uuidv4 from 'uuid/v4'
import Fade from 'react-reveal/Fade'


const Container = styled.div`
display: flex;
flex-direction: column;
width: 30%;
overflow: scroll;
height: calc(100vh - 3.5rem);
`

const HistoryTitle = styled.h4`
    color: #9e9d9d;
    font-size: 1.2rem;
    font-weight: 300;
    padding-left: 5px;
    border-left: 2px solid #e2574c;
`

const Item = styled.div`
    width: 95%;
    border: 1px solid #cccccc;
    border-radius: 10px;
    padding: .6rem;
    margin: .3rem 0;
    cursor: pointer;
    font-size: 0.8rem;
    transition: all .3s ease-in-out;
    &:hover {
        border: 1px solid #00A6A6; 
    }
`

const ItemHead = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const ItemName = styled.span`
    font-weight: bold;
`
const ItemBody = styled.div`
    display: flex;
    flex-direction: column;

`
const CreatedAt = styled.div`
    font-size: .6rem;
    font-style: italic;
    padding: 5px 0 0 0;
    color: #a6a6a6;
`
const Jira = styled.div`
    font-size: .8rem;
    padding: 5px 0;
    color: #a6a6a6;
`

const RemoveIcon = styled(FontAwesomeIcon)`
    font-size: 1rem;
    color: #cccccc;
    margin-right: .8rem;
    transition: all .2s ease-in;
    &:hover {
        color: #ff6961;
    }
`


const JiraHistory = ({ store }) => {
    const [jira, setJira] = useState([])

    const handleNewJiraSuccessListener = async (e, fileObj) => {
        const jiraObj = (({ merchandName, filepath, issueKey, url, creationDate }) => ({ merchandName, filepath, issueKey, url, creationDate }))(fileObj)
        jiraObj.id = uuidv4()
        setJira([jiraObj, ...jira])
        const alljira = await store.get('jira')
        await store.set('jira', [jiraObj, ...alljira])
    }

    useEffect(() => {
        if (store.get('jira')) {
            setJira(store.get('jira'))
        } else {
            store.set('jira', [])
        }
    }, [])

    useEffect(() => {
        ipcRenderer.on('new-jira-success', handleNewJiraSuccessListener)
        return () => ipcRenderer.removeListener('new-jira-success', handleNewJiraSuccessListener)
    }, [jira])

    const removeItem = (e, id) => {
        e.stopPropagation()
        const oldjira = [...jira]
        const newjira = oldjira.filter(item => item.id !== id)
        setJira(newjira)
        store.set('jira', newjira)
    }

    const openUrl = (e, url) => {
        ipcRenderer.send('open-url', (e, url))
    }

    const renderJiraLinks = arr => arr.map((item, i) => (
        <Fade key={i}>
            <Item onClick={e => openUrl(e, item.url)}>
                <ItemHead>
                    <ItemName>{item.merchandName}</ItemName>
                    <RemoveIcon icon='trash-alt' onClick={e => removeItem(e, item.id)} />
                </ItemHead>
                <ItemBody>
                    <Jira>Jira issue: {item.issueKey}</Jira>
                    <CreatedAt>{moment(item.creationDate).format("MMMM Do YYYY, h:mm a")}</CreatedAt>
                </ItemBody>
            </Item>
        </Fade>
    ))

    return (
        <Container>
            <HistoryTitle>Jira History</HistoryTitle>
            {jira.length > 0 && renderJiraLinks(jira)}
        </Container>
    )
}

export default JiraHistory