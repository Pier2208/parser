import React from 'react'
import styled, { css } from 'styled-components'
import { useSpring, animated } from 'react-spring'

const FormInputContainer = styled.div`
    position: relative;
    width: 80%;
    margin: 1rem auto;
`

const Label = styled.label`
    font-size: 1rem;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 0;
    color: #949494;
    font-family: 'Roboto', sans-serif;
    transition: 200ms ease all;
    ${({ shrink }) => shrink && css`
        left: -4px;
        top: -15px;
        color: #b5b5b5;
        font-size: .8rem;
    `}
`

const Input = styled.input`
    width: 100%;
    padding: .2rem 1rem .2rem 1rem;
    font-size: 1.3rem;
    border: none;
    border-bottom: 1px solid #cccccc;
    outline: none;
    border-radius: 0;
    color: #949494;
    letter-spacing: .5rem;
    font-family: 'Roboto', sans-serif;
    }
    &:focus ~ ${Label} {
        left: -4px;
        top: -15px;
        color: #b5b5b5;
        font-size: .8rem;
        }
`

const ErrorMessage = styled(animated.span)`
    width: fit-content;
    font-size: .8rem;
    color: #DF2935;
    margin-top: .3rem;
`

const FormInput = ({ label, onChange, value, type, name, error }) => {
    const popIn = useSpring({
        from: { opacity: 0 }, opacity: 1
    })

    return (
        <FormInputContainer>
            <Input
                type={type}
                name={name}
                onChange={onChange}
            />
            {label && <Label shrink={value.length}>{label}</Label>}
            {error && <ErrorMessage style={popIn}>{error}</ErrorMessage>}
        </FormInputContainer>
    )
}

export default FormInput