import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import { useAuth } from "../../contexts/contexts";
import { auth } from "../../firebase";
import './navbar.css';

export default function BootstrapNavbar() {
    const { logout } = useAuth();
    const [error, setError] = useState("")
    let email = undefined;

    if(auth.currentUser != null) {
        email = auth.currentUser.email
    }

    async function handleLogout() {
        setError("")

        try {
            await logout();
        } catch {
            setError("Failed to log out");
        }
    }

    return(
        <div className='navbar-div'>
            <div className="row">
                <div className="col-md-12" id='navbar-container'>
                    <Router>
                        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                            <Navbar.Brand href="#home">Party games app</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="ml-auto">
                                        <Nav.Link href="/login" onClick={handleLogout}>Log Out</Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                        </Navbar>
                    </Router>
                </div>
            </div>
        </div>
    )  
}