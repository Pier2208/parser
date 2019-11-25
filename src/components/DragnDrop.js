import React from 'react'
import Dropzone from 'react-dropzone'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const getColor = props => {
    if (props.isDragAccept) {
        return '#187d31';
    }
    if (props.isDragReject) {
        return '#ff6961';
    }
    return '#bed4c4';
}

const Container = styled.div`
    align-items: center;
    border: 3px dashed #bed4c4;
    border-color: ${props => getColor(props)};
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    outline: none;
    padding: 6rem 5rem;
    width: 100%;
    margin: 1rem auto 3rem auto;
    word-break: break-word;
    transition: border .3s ease-in-out;
`
const DropzoneLabel = styled.div`
    display: flex;
    align-items: center;
    color: #8ca393;
    width: 100%;
`
const FileIcon = styled(FontAwesomeIcon)`
    font-size: 4rem;
    margin-right: 1rem;
`
const IconLabel = styled.span`
    font-size: 1.3rem;
`


const DragnDrop = ({ setFiles, files, acceptedFileTypes }) => {
    const onDrop = acceptedFiles => {
        setFiles(acceptedFiles)
    }

    return (
        <Dropzone
            onDrop={onDrop}
            accept={acceptedFileTypes}
            multiple={false}
            isDragAccept
            isDragReject
        >
            {({ getRootProps, getInputProps, isDragAccept, isDragReject }) => {
                return (
                    <Container {...getRootProps({ isDragAccept, isDragReject })}>
                        {
                            !files.length ?
                                <DropzoneLabel>
                                    <FileIcon icon='file-excel' />
                                    <IconLabel>Drop file here or click to select</IconLabel>
                                </DropzoneLabel>
                                :
                                <DropzoneLabel>
                                    <FileIcon icon='file-excel' />
                                    <IconLabel>{files[0].name}</IconLabel>
                                </DropzoneLabel>
                        }
                        <input {...getInputProps()} />
                    </Container>
                )
            }}
        </Dropzone>
    )
}

export default DragnDrop

