import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 90%;
    padding: .2rem 1rem .2rem 1rem;
    margin: 0 auto;
    margin-bottom: 1rem;
    font-size: .9rem;
`

const Checkbox = styled.input`

`

const CustomCheckbox = ({ name, label, checked, onChange }) => (
    <Container>
        <Checkbox
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange}
        />
        <label htmlFor="savePassword">{label}</label>
    </Container>
)

export default CustomCheckbox