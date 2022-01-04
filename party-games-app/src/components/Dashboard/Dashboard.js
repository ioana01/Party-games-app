import React, { Component} from 'react';
import Card from '../card/card';
import './dashboard.css';
import img1 from './react-logo.png';
import { database } from "../../firebase";

class Dashboard extends Component{
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        }
    }

    async componentDidMount() {
        let roomsList = [];
        const roomsRefs = database.ref('rooms');

        await roomsRefs.on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                const childData = childSnapshot.val();
                const childId = childSnapshot.key;

                roomsList.push(
                    {
                        data: childData,
                        id: childId
                    }
                )
            });

            this.setState({ rooms : roomsList });
        });

    }

    render(){
        return(
            <div>
                {this.state.rooms.length &&   
                (<div>
                    <div className="container-fluid d-flex justify-content-center">
                        <div className="row" id="courses">
                            {this.state.rooms.map(room => (
                                <div className="col-md-4">
                                    <Card imgsrc={img1} room={room.data} id={room.id.replace('-','')}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>)}
            </div>
        );
    }
}

export default Dashboard;