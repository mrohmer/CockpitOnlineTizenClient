import React, {useState} from "react";
import Session from './Session/Session';
import SessionInput from './SessionInput/SessionInput';

export default function App() {
  const [sessionName, setSessionName] = useState<string|undefined>(localStorage?.getItem('carrera-live.session-name') ?? undefined);

  const handleChange = (value: string) => {
    localStorage?.setItem('carrera-live.session-name', value);
    setSessionName(value)
  }

  return (
    <div>
      {!sessionName && (<SessionInput onSubmit={handleChange} />)}
      {sessionName && (<Session sessionName={sessionName} onBack={() => setSessionName(undefined)} />) }
    </div>
  )
}
