import React from 'react'
import styled, { css } from 'styled-components'

const Button = styled.div`
    align-items: center;
    border: none;
    border-radius: 10px;
    box-shadow: 8px 8px 6px -5px rgba(208,212,208,1);
    cursor: pointer;
    display: flex;
    font-family: 'Roboto', sans-serif;
    font-size: 1.1rem;
    font-weight: bold;
    height: 2rem;
    justify-content: center;
    margin-left: 1rem;
    padding: 1.4rem 1.2rem;
    width: 32%;
    transition: all .3s ease-in-out
    ${({ color, disabled }) => (color === 'process' && !disabled) && css`
        background: #187d31;
        color: #FBF5F3;
        &:hover {
            background: #136427;
        }
    `}
    ${({ color }) => color === 'reset' && css`
        background: #ff6961;
        color: #FBF5F3;
        text-transform: uppercase;
        &:hover {
            background: #b5222c;
        }
    `}
    ${({ color }) => color === 'default' && css`
        background: #cccccc;
        color: #FBF5F3;
        text-transform: uppercase;
    `}
    ${({ disabled }) => disabled && css`
        background-color: #cccccc;
        color: #a19d9d;
        cursor: not-allowed;
        box-shadow: none;
    `}
    ${({ value }) => value && css`
        background-color: #2BA84A;
        color: #fff;
        &:hover {
            background: #187d31;
        }
    `}
`


const CustomButton = ({ color, onClick, disabled, children, value }) => {
    return (
        <Button
            color={color}
            onClick={onClick}
            disabled={disabled}
            value={value}
        >
            <span>{children}</span>
        </Button>
    )
}

export default CustomButton