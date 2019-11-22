import React, { useState, useEffect } from 'react'
const { ipcRenderer } = require('electron')
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Fade from 'react-reveal/Fade'
import styled from 'styled-components'
import moment from 'moment'
import uuidv4 from 'uuid/v4'


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


const CIHistory = ({ store }) => {
    const [csv, setCsv] = useState([])

    const handleNewXlsxToCsvDoneListener = async (e, fileObj) => {
        console.log('fileobj', fileObj)
        const csvObj = (({ merchandName, dirpath, creationDate }) => ({ merchandName, dirpath, creationDate }))(fileObj)
        csvObj.id = uuidv4()
        csvObj.EBOS = ''
        const allcsv = await store.get('csv')
        await store.set('csv', [csvObj, ...allcsv])
        setCsv([csvObj, ...csv])
    }

    useEffect(() => {
        if (store.get('csv')) {
            setCsv(store.get('csv'))
        } else {
            store.set('csv', [])
        }
    }, [])

    useEffect(() => {
        ipcRenderer.on('new-xlsx-to-csv-done', handleNewXlsxToCsvDoneListener)
        return () => ipcRenderer.removeListener('new-xlsx-to-csv-done', handleNewXlsxToCsvDoneListener)
    }, [csv])

    const openDirectory = (e, directory) => {
        ipcRenderer.send('open-directory', (e, directory))
    }

    const removeItem = (e, id) => {
        e.stopPropagation()
        const oldcsv = [...csv]
        const newcsv = oldcsv.filter(item => item.id !== id)
        setCsv(newcsv)
        store.set('csv', newcsv)
    }

    const renderCsvLinks = arr => arr.map((item, i) => (
        <Fade key={i}>
            <Item onClick={e => openDirectory(e, item.dirpath)}>
                <ItemHead>
                    <ItemName>{item.merchandName}</ItemName>
                    <RemoveIcon icon='trash-alt' onClick={e => removeItem(e, item.id)} />
                </ItemHead>
                <ItemBody>
                    <CreatedAt>{moment(item.creationDate).format("MMMM Do YYYY, h:mm a")}</CreatedAt>
                </ItemBody>
            </Item>
        </Fade>
    ))

    return (
        <Container>
            <HistoryTitle>Content Injection History</HistoryTitle>
            {csv.length > 0 && renderCsvLinks(csv)}
        </Container>
    )
}

export default CIHistory