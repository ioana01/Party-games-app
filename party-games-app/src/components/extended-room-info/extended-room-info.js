import React, {Component} from 'react';
import { auth, database } from "../../firebase";
import { Link } from "react-router-dom";
import './extended-room-info.css';
import MyPopUp from "../PopUp/PopUp";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Card, Form, Button, Alert } from "react-bootstrap";

class ExtendedInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            roomId: `-${this.props.match.params.id}`,
            isOpen: false,
            roomInfo: {}
        }
    }
  
    togglePopupOpen = (e) => {
        if (this.state.isOpen == false){
            this.setState({ isOpen: true });
        }
    }

    handleClose = (e) => {
        this.setState({ isOpen: false });
    }
  
    joinRoom = (e) => {
        let playersList = this.state.roomInfo.players;
        playersList.push({'name': auth.currentUser.email, 'score': 0});
        console.log(playersList);
        database.ref('/rooms').child(this.state.roomId).update({'players': playersList});
        database.ref('/rooms').child(this.state.roomId).update({'current_users_number': this.state.roomInfo.current_users_number + 1});
        this.componentDidMount();
    }

    exitRoom = (e) => {
        let playersList = this.state.roomInfo.players;
        for( var i = 0; i < playersList.length; i++){ 
    
            if ( playersList[i].name === auth.currentUser.email) { 
        
                playersList.splice(i, 1); 
            }
        
        }
        console.log(playersList);
        database.ref('/rooms').child(this.state.roomId).update({'players': playersList});
        database.ref('/rooms').child(this.state.roomId).update({'current_users_number': this.state.roomInfo.current_users_number - 1});
        this.componentDidMount();
    }
    checkIfInRoom() {
        let playersList = [];
        if(this.state.roomInfo && this.state.roomInfo.players) {
            const players = this.state.roomInfo.players;
            playersList = players.map((player) => {return player.name})
            if (playersList.indexOf(auth.currentUser.email) > -1){
                return true;
            }
            return false;
        }
    }

    async componentDidMount() {
        let room;
        const roomsRefs = database.ref('rooms');

        await roomsRefs.on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                const childData = childSnapshot.val();
                const childId = childSnapshot.key;

                if(childId === this.state.roomId) {
                    room = childData;
                }
            });

            this.setState({ roomInfo : room });
        });

    }

    render() {
        let playersList;
        if(this.state.roomInfo && this.state.roomInfo.players) {
            const players = this.state.roomInfo.players;
            playersList = players.map((player) => <li className="card-text text-secondary">{player.name}: {player.score} points</li>)
        }

        return (
            this.state.roomInfo &&
            <div className='room-extended-info'>
                <h4 className="info-card-title">Camera: { this.state.roomInfo.name }</h4>
                <p className="card-text text-secondary"> Game: { this.state.roomInfo.game } </p>
                <p className="card-text text-secondary"> Game state: { this.state.roomInfo.state } </p>
                <p className="card-text text-secondary"> Room type: { this.state.roomInfo.type } </p>
                <p className="card-text text-secondary"> Admin: { this.state.roomInfo.admin_name } </p>
                <p className="card-text text-secondary"> Users number: { this.state.roomInfo.current_users_number } </p>
                <p className="card-text text-secondary"> Max users number: { this.state.roomInfo.max_users_number } </p>
                <p className="card-text text-secondary"> Players: </p>
                <ul>
                    {playersList}
                </ul>
                <p className="card-text text-secondary"> Audience: { this.state.roomInfo.audience_number} </p>
                <p className="card-text text-secondary"> Audience score: { this.state.roomInfo.audience_score} points</p>

                <div className='join-game-btn-container'>
                    {(() => {
                        if (this.checkIfInRoom()){
                            if (this.state.roomInfo.admin_name == auth.currentUser.email){
                                return (
                                    <div>
                                        <Button className="btn btn-outline-success join-game-btn" onClick={(e) => this.exitRoom(e)}> Exit room </Button>
                                        <Link className="btn btn-outline-success join-game-btn" to={{pathname: `/game/`}}> Start game </Link>
                                    </div>
                                )
                            } else {
                                return (
                                    <Button className="btn btn-outline-success join-game-btn" onClick={(e) => this.exitRoom(e)}> Exit room </Button>
                                )
                            }
                        } else{
                            if (this.state.roomInfo.current_users_number >= this.state.roomInfo.max_users_number){
                                return (
                                    <Popup trigger={<Button className="btn btn-outline-success join-game-btn"> Join room </Button>} position="right center">
                                        <div>Room is already at maximum capacity of users!</div>
                                    </Popup>
                                )
                            } else {
                                if (this.state.roomInfo["type"] == "private") {
                                    return (
                                        <div>
                                            <Button className="btn btn-outline-success join-game-btn" onClick={(e) => this.togglePopupOpen(e)}>
                                            <MyPopUp 
                                                trigger = {this.state.isOpen}
                                                handleClose = {this.handleClose}
                                                button = "Join room"
                                                roomId = {this.state.roomId} 
                                                joinRoom = {this.joinRoom}/>
                                            Join Room
                                            </Button>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <Button className="btn btn-outline-success join-game-btn" onClick={(e) => this.joinRoom(e)}> Join room </Button>
                                    )
                                }
                            }
                        }    
                        })()}
                </div>
            </div>
        )
    }
}

export default ExtendedInfo;