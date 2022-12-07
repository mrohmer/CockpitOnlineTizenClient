import React from 'react';

export default function Error({error}: Record<'error', string | any>) {
  return (
    <div className="error">
      <div className="error__exclamation">!</div>
      <div className="error__text">
        {error}
      </div>
    </div>
  )
}
