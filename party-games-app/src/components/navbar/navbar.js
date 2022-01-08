import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import { useAuth } from "../../contexts/contexts";
import { auth, database } from "../../firebase";
import './navbar.css';
import { CheckIfUserIsGuest, verifyGuest } from '../../utils/utils';

export default function BootstrapNavbar() {
    const { logout } = useAuth();
    const [error, setError] = useState("")
    let email = undefined;
    if(auth.currentUser != null) {
        email = auth.currentUser.email
    }

    async function handleLogout() {
        setError("")
        console.log("logout")
        console.log(auth.currentUser.email)
        try {
            let guest = false;
            let entryKey = "";
            await database.ref('guests').once('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();
                    if (childData['email'] === email) {
                        console.log("guest useeeer");
                        guest = true;
                        entryKey = childSnapshot.key;
                    }
                });
            });
            if (guest){
                await auth.currentUser.delete().then().catch(function (error) {
                    console.error({error})
                });
                await database.ref('guests/').child(entryKey).remove();
            } else {
                await logout();
            }
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
                                        <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                        </Navbar>
                    </Router>
                </div>
            </div>
        </div>
    )  
}