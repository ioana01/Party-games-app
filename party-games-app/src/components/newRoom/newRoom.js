import { render } from "@testing-library/react";
import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap"; 
import { Link, useHistory } from "react-router-dom";
import { database } from "../../firebase";
import '../Auth/SignUp/SignUp';
import './newRoom.css';

export default function NewRoom() {
    
    const roomnameRef = useRef();
    const adminnameRef = useRef();
    const max_users_numberRef = useRef();
    const passwordRef = useRef();
    const typeRef = useRef();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [chose, selectOption] = useState("");
    const history = useHistory();
    
    function setOption(e){  
        if(e.target.value == "public"){  
            selectOption(1);
        } else if(e.target.value == "private"){ 
            selectOption(2);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        try {
            const userData = {
                name:roomnameRef.current.value,
                type : typeRef.current.value,
                admin_name : adminnameRef.current.value,
                max_users_number :  max_users_numberRef.current.value,
                password : passwordRef.current.value,
                game: 'trivia',
                state: 'lobby',
                current_users_number: 0
            }
            database.ref('rooms').push(userData);

            setError("");
            setLoading(true);
            history.push("/");
        }catch(error) {
            setError(error.message);
        }

        setLoading(false);
    }

    render()
        return (
            <Card id='card-container-new-room'>
                <Card.Body>
                    <h2 className="text-center mb-4">Create your own room</h2>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="name">
                            <Form.Label>Room Name</Form.Label>
                            <Form.Control type="name" ref={roomnameRef} required />
                        </Form.Group>
                        <Form.Group id="admin_name">
                            <Form.Label>Admin Name</Form.Label>
                            <Form.Control type="admin_name" ref={adminnameRef} required />
                        </Form.Group>
                        <Form.Group id="max_users_number">
                            <Form.Label>Number of players</Form.Label>
                            <Form.Control type=" max_users_number" ref={max_users_numberRef} required />
                        </Form.Group>
                        <Form.Group id="type">
                            <Form.Label id='room-type'>Room type</Form.Label>
                            <Form.Select onChange={setOption} ref={typeRef} required>
                                <option value="">Select option</option>
                                <option value = "public">Public</option>
                                <option value = "private">Private</option>
                            </Form.Select>
                        </Form.Group>
                        {chose === 2 && 
                        <Form.Group id="password">
                            <Form.Label>Room Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>}  

                        <Button disabled={loading} className="w-100 auth-button" type="submit">
                            Create room!
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        )
}