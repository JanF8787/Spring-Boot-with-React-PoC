import * as React from 'react';
import { useState } from "react";
import '../App.css';
import './User.css';

export default function UserRegistration() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleClick = (e) => {
        e.preventDefault();
        const user = { username, password, email };

        fetch("http://localhost:8080/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).then((res) => {
            if (res.ok) {
                res.json()
                    .then(data => {
                        if (data.field === "success") {
                            setSuccessMessage(data.message);

                            setUsernameError("");
                            setEmailError("");
                            setPasswordError("");

                            setUsername("");
                            setEmail("");
                            setPassword("");
                        }
                    })
            } else if (res.status === 400) {
                res.json()
                    .then(data => {
                        if (data) {
                            if (data.field === "username") {
                                setUsernameError(data.message);
                                setEmailError("");
                                setPasswordError("");
                            }
                            if (data.field === "email") {
                                setUsernameError("");
                                setEmailError(data.message);
                                setPasswordError("");
                            }
                            if (data.field === "password") {
                                setUsernameError("");
                                setEmailError("");
                                setPasswordError(data.message);
                            }
                        }
                    });
            }
        });
    }

    return (

        <div className='my-container'>

            <div className="login-box">

                <h3>Please, make a registration !</h3>

                <form>

                    <div className="user-box">
                        <input type="text" name="username"
                            value={username} onChange={(e) => setUsername(e.target.value)} />
                        {usernameError ? <span style={{ color: '#be3144', fontSize: '14px' }}><strong>{usernameError}</strong></span> : ''}
                        <label htmlFor="username" className="form-label">Username</label>
                    </div>

                    <div className="user-box">
                        <input type="text" name="email"
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                        {emailError ? <span style={{ color: '#be3144', fontSize: '14px' }}><strong>{emailError}</strong></span> : ''}
                        <label htmlFor="username" className="form-label">Email</label>
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

                {successMessage ? <p style={{ color: '#03e9f4', marginTop: '30px', paddingLeft: '100px' }}>{successMessage}</p> : ''}

            </div>

        </div>
    );
}