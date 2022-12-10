import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Icon = styled.div`
  font-size: 50px;
  color: #ff0044;
  gap: 5px;
`;
const Text = styled.div`
  font-size: 20px;
`;
export default function Error({error}: Record<'error', string | any>) {
  const errorToString = (): string => {
    if (!error) {
      return '🤷';
    }
    if (typeof error === 'string') {
      return error;
    }
    if (typeof error === 'object') {
      if (error.message) {
        return error.message;
      }
      if (error.toString?.() && error.toString() !== {}.toString()) {
        return error.toString();
      }
    }

    return '🤷';
  }
  return (
    <Root>
      <Icon>!</Icon>
      <Text>
        {errorToString()}
      </Text>
    </Root>
  )
}
