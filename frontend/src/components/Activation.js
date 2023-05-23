import React, { useEffect, useState } from 'react'

export default function Activation() {
  const token = localStorage.getItem("jwt");
  const [actCode, setActivationCode] = useState("");
  const [activated, setActivated] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch('http://localhost:8080/user/getInformation', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
      .then(res => res.json())
      .then(data => setActivationCode(data.activationCode));
  });

  useEffect(() => {
    fetch(`http://localhost:8080/activation/${actCode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
      .then(res => {
        if (res.ok) {
          setActivated(true);
        } else if (!res.ok) {
          res.json()
            .then(msg => setErrorMessage(msg.message));
        }
      })
  })

  return (
    <div className='my-todos'>
      {activated ? <h4>Your profile was activated!</h4> : <h4>{errorMessage}</h4>}
    </div>
  )
}
