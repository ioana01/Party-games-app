import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth, database } from "../../firebase";
import './player-option.css';

const PlayerOption = (props) => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const addPlayer = async () => {
        const roomsRefs = database.ref('rooms');
        let players = [];
        let currentUsersNumber;

        await roomsRefs.on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                const childData = childSnapshot.val();
                const childId = childSnapshot.key;

                if(childId === props.roomId) {
                    players = childData.players;
                    currentUsersNumber = childData.current_users_number;
                }
            });
        });

        currentUsersNumber++
        players.push({name: auth.currentUser.email, score: 0});
        database.ref('/rooms').child(props.roomId).update({'players': players, 'current_users_number': currentUsersNumber});
        database.ref('/rooms').child(props.roomId).update({'state': 'started'});
    }

    const addSpectator = async () => {
        const roomsRefs = database.ref('rooms');
        let audience;

        await roomsRefs.on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                const childData = childSnapshot.val();
                const childId = childSnapshot.key;

                if(childId === props.roomId) {
                    audience = childData.audience_number;
                }
            });
        });

        audience++;
        database.ref('/rooms').child(props.roomId).update({'audience_number': audience});
        database.ref('/rooms').child(props.roomId).update({'state': 'started'});
    }

    return (props.trigger) ? (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={props.handleClose}> x </span>
                <div>
                    <div>
                        <h4 className="popup-title">Choose your role:</h4>
                    </div>

                    <Card id='card-container-login'>
                        <Card.Body>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form>
                                <Link to={{pathname: `/trivia/${props.roomId}`}}>
                                    <Button 
                                        id="player" 
                                        disabled={loading} 
                                        className="w-100 auth-button" type="submit" style={{backgroundColor: "#343a40"}}
                                        onClick={addPlayer}>
                                        Player
                                    </Button>
                                </Link>
                                <br></br>
                                <Link to={{pathname: `/trivia/${props.roomId}`}}>
                                    <Button 
                                        id="spectator" 
                                        disabled={loading} 
                                        className="w-100 auth-button" type="submit" style={{backgroundColor: "#343a40"}}
                                        onClick={addSpectator}>
                                        Spectator
                                    </Button>
                                </Link>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    ): "";
}

export default PlayerOption;