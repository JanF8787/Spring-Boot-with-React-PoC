import * as React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import './User.css';

export default function UserLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    const user = { username, password };

    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    })
      .then((res) => {
        if (res.ok) {
          res.json()
            .then(data => {
              localStorage.setItem("jwt", data.message);
              setAuth(true);
              navigate('/my_todos');
            });
        } else if (res.status === 400) {
          res.json()
            .then(data => {
              if (data.field === "username") {
                setUsernameError(data.message);
                setPasswordError("");
              }

              if (data.field === "password") {
                setUsernameError("");
                setPasswordError(data.message);
              }
            });
        }
      });
  }

  return (

    <div className='my-container'>

      <div className="login-box">

        <h3>Please, Log in or make a <Link style={{ textDecoration: 'none', color: '#03e9f4' }} to='/register'>registration</Link> !</h3>

        <form>

          <div className="user-box">
            <input type="text" name="username"
              value={username} onChange={(e) => setUsername(e.target.value)} />
            {usernameError ? <span style={{ color: '#be3144', fontSize: '14px' }}><strong>{usernameError}</strong></span> : ''}
            <label htmlFor="username" className="form-label">Username or Email</label>
          </div>

          <div className="user-box">
            <input type="password" name='password'
              value={password} onChange={(e) => setPassword(e.target.value)} />
            {passwordError ? <span style={{ color: '#be3144', fontSize: '14px' }}><strong>{passwordError}</strong></span> : ''}
            <label htmlFor="password">Password</label>
          </div>

          <button type='submit' onClick={handleClick} >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Log in
          </button>

        </form>

      </div>

    </div>
  );
}
