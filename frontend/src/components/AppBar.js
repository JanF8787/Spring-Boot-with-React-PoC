import * as React from 'react';
import { Link } from 'react-router-dom';

export default function Appbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-secondary" style={{ width: "60vw" }}>

            <div className="container-fluid">

                <div>
                    <Link className="navbar-brand" to="/">ToDo App</Link>
                </div>

                <div>
                    <Link style={{ marginRight: "10px" }} className="btn btn-outline-info" to="/register">Sign in</Link>
                    <Link className="btn btn-outline-info" to="/login">Log in</Link>
                </div>

            </div>

        </nav>
    );
}