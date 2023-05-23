import * as React from 'react';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthProvider';

export default function LoggedBar() {
  const token = localStorage.getItem("jwt");
  const [name, setName] = useState("");
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  fetch("http://localhost:8080/user/getInformation", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
  })
    .then(res => {
      if (res.ok) {
        res.json()
          .then(data => {
            setName(data.username);
          });
      }
    });

  const logOut = (e) => {
    e.preventDefault();
    navigate("/login");
    localStorage.removeItem('jwt');
    setAuth(false);
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-secondary" style={{ width: "60vw" }}>

      <div className="container-fluid">

        <div>
          <Link style={{ marginRight: "10px" }} className="btn btn-outline-info" to="/profile">{name}</Link>
          <Link className="btn btn-outline-info" to="/my_todos">My Todos</Link>
        </div>

        <div style={{ paddingRight: '70px' }}>
          <Link className="navbar-brand" to="/">Todo App</Link>
        </div>

        <div>
          <Link className="btn btn-danger" onClick={logOut}>Log out</Link>
        </div>

      </div>

    </nav>
  );
}