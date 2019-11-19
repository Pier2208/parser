import React, { useState } from 'react'
import styled from 'styled-components'
import { ipcRenderer } from 'electron'
import { useSpring, animated } from 'react-spring'

import FormInput from './FormInput'
import CustomButton from './Button'
import CustomCheckbox from './Checkbox'


const Overlay = styled(animated.div)`
    width: 100vw;
    height: 100vh;
    background: #000;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
`

const ModalBox = styled(animated.div)`
    width: 50%;
    background-color: #fff;
    z-index: 10;
    border-radius: 15px;
    position: absolute;
    left: 50%;
    top: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
`

const ModalForm = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1.5rem;
    width: 100%;
    position: relative;
`

const Buttons = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 90%;
`

const ExtraLabel = styled.span`
    position: absolute;
    width: fit-content;
    bottom: 10px;
    left: 70px;
    font-size: .6rem;
`


const Modal = ({ setIsModalOpen, isModalOpen, store, setError, error, files, processing, setProcessing }) => {
    const [password, setPassword] = useState('')
    const [isSavePasswordChecked, setIsSavePasswordChecked] = useState(false)

    const closeModal = () => {
        setIsModalOpen(false)
        setError('')
    }

    const handleSubmit = () => {
        if (!password) {
            setError('You must provide a password')
            return
        }
        if (isSavePasswordChecked) {
            store.set('JiraPassword', password)
        }
        setIsModalOpen(false)
        setProcessing(true)
        setError('')
        console.log(`Creating Jira with password ${password}`)
        // create JIRA
        const data = {
            filename: files[0].name,
            filepath: files[0].path,
            password
        }
        ipcRenderer.send('new-jira', data)
    }

    const fadeInOverlay = useSpring({ from: { opacity: 0 }, opacity: .7 })
    const fadeInModal = useSpring({ 
        from: { opacity: 0, transform: `translate( -50%, -100%)`}, opacity: 1, transform: `translate(-50%,-50%)` })

    return (
        <>
            <Overlay onClick={closeModal} style={fadeInOverlay} />
            <ModalBox style={fadeInModal}>
                <ModalForm>
                    <FormInput
                        type='password'
                        name='password'
                        label='Password*'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        error={error}
                    />
                    <CustomCheckbox
                        name='savePassword'
                        label='Remember my password'
                        checked={isSavePasswordChecked}
                        onChange={e => setIsSavePasswordChecked(e.target.checked)}
                    />
                    <Buttons>
                        <CustomButton color='reset' onClick={closeModal}>Cancel</CustomButton>
                        <CustomButton color='default' onClick={handleSubmit} value={password} disabled={!password}>OK</CustomButton>
                    </Buttons>
                </ModalForm>
                <ExtraLabel>*Windows/Jira password</ExtraLabel>
            </ModalBox>
        </>
    )
}

export default Modal