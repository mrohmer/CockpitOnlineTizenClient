import React, {useState} from "react";
import Session from './Session/Session';
import SessionInput from './SessionInput/SessionInput';

const STORAGE_KEY = {
  SESSION_NAME: 'cockpit-online.session-name',
}
export default function App() {
  const [sessionName, setSessionName] = useState<string|undefined>(localStorage?.getItem(STORAGE_KEY.SESSION_NAME) ?? undefined);

  const handleChange = (value: string) => {
    localStorage?.setItem(STORAGE_KEY.SESSION_NAME, value);
    setSessionName(value)
  }

  return (
    <div>
      {!sessionName && (<SessionInput onSubmit={handleChange} />)}
      {sessionName && (<Session sessionName={sessionName} onBack={() => setSessionName(undefined)} />) }
    </div>
  )
}
