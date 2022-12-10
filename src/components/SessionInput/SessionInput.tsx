import React, {FormEvent, useState} from 'react';
import styled from 'styled-components';
import Input from './Input';

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const InnerForm = styled.div`
  width: 75%;
`

export default function SessionInput({onSubmit}: Partial<Record<'onSubmit', (value: string) => void>>) {
  const [value, setValue] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (value?.trim().length < 2) {
      setSubmitted(true);
      return;
    }

    onSubmit?.(value);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <InnerForm>
        <Input id={'session-name'} value={value} onChange={setValue}>Sessionname</Input>
      </InnerForm>
    </Form>
  )
}
