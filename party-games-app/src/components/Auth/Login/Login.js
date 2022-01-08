import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import Popup from 'reactjs-popup';
import { useAuth } from "../../../contexts/contexts";
import { Link, useHistory } from "react-router-dom";
import 'reactjs-popup/dist/index.css';
import './Login.css';

export default function Login() {
    const guestNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef(); 
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const submitHandlers = {
        login: handleLogIn,
        guest: handleGuest,
      }
   
    function handleSubmit(e) {
        e.preventDefault()

        const { id } = e.nativeEvent.submitter;
        submitHandlers[id](e);
    }

    async function handleLogIn(e) {
        e.preventDefault()
        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/")
        } catch(error) {
          setError(error.message);
        }
    
        setLoading(false);
    }

    function handleGuest(e) {
        e.preventDefault();
        // TODO: popup cu nume
        // TODO: create new guest (parola: guest) intr-o tabela `guests`
        // const guestData = {
        //     name: nameRef.current.value
        // }
        // database.ref('users').push(userData);
        // facem login
        // redirectare catre `/`
    }   

    return (
        <>
            <Card id='card-container-login'>
                <Card.Body>
                    <h2 className="text-center mb-4">Login</h2>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>

                        <Form.Group id="password" style={{marginBottom: "20px"}}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>

                        <Button 
                            id="login" 
                            disabled={loading} 
                            className="w-100 auth-button" type="submit" style={{backgroundColor: "#343a40"}}>
                            Login
                        </Button>

                        <Popup 
                            trigger={
                                <Button  
                                    disabled={loading} 
                                    className="w-100 auth-button" type="button" style={{backgroundColor: "#343a40"}}>
                                    Play as Guest
                                </Button>} 
                            position="right center">
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="guestName" style={{marginBottom: "20px"}}>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" ref={guestNameRef} required />
                                </Form.Group>
                                <Button  
                                    id="guest"
                                    disabled={loading}
                                    className="w-100 auth-button" type="submit" style={{backgroundColor: "#343a40"}}>
                                    Play as Guest
                                </Button>
                            </Form>
                        </Popup>
                    </Form>
                </Card.Body>
            </Card>
            
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}