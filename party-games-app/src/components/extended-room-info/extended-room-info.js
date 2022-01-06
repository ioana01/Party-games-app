import React, {Component} from 'react';
import { database } from "../../firebase";
import { Link } from "react-router-dom";
import './extended-room-info.css'
class ExtendedInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            roomId: `-${this.props.match.params.id}`,
            roomInfo: {}
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
                    <Link className="btn btn-outline-success join-game-btn" to={{pathname: `/game/`}}> Join game </Link>
                </div>
            </div>
        )
    }
}

export default ExtendedInfo;