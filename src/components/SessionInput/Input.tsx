import React, {PropsWithChildren, useState} from 'react';
import styled from 'styled-components';

const Root = styled.div`
  border: 1px solid #ff9a5a;
  border-radius: 4px;
  padding: 4px 0;
  width: 100%;
  transition: all 0.2s ease 1s;
  ${({active}: Record<'active',boolean>) => active ? `
    position: fixed;
    left: 100vh;
    right: 100vh;
    top: 0;
    bottom: 0;
    max-height: 60px;
    margin: auto;
    border-color: transparent;
    width: auto;
  ` : ''}
`;
const Label = styled.label`
  position: absolute;
  top: -10px;
  left: 12px;
  font-size: 20px;
  padding: 0 4px;
  display: block;
  background: black;
  width: fit-content;
  color: #ff9a5a;
  z-index: 1;
`;
const InputEl = styled.input`
  width: 100%;
  padding: 0 16px;
  height: 60px;
  line-height: 60px;
  font-size: 30px;
  text-align: left;
  background: black;
  border: none;
  color: #ffffff;
  
  &:focus {
    max-height: 100%;
    line-height: 100%;
  }
`
export default function Input({id, value, onChange, children}: PropsWithChildren<Record<'id'|'value', string> & Record<'onChange', (value: string) => void>>) {
  const [active, setActive] = useState(false);
  return (
    <Root active={active}>
      {!active && (<Label htmlFor={id}>
        {children}
      </Label>)}
      <InputEl type="text" id={id} value={value} onChange={(event) => onChange(event.target.value)} onFocus={() => setActive(true)} onBlur={() => setActive(false)}/>
    </Root>
  )
}
