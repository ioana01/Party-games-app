import React, { Component} from 'react';
import Card from '../Card/Card';
import './Dashboard.css';
import img1 from './react-logo.png';
import { database, auth } from "../../firebase";
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
                roomsList.push(childData);
            });
            this.setState({ rooms : roomsList });
        });

    }

    render(){
        return(
            <div>
                {
                    this.state.rooms.length &&   
                    (<div>
                        <div className="container-fluid d-flex justify-content-center">
                            <div className="row" id="courses">
                                {
                                    this.state.rooms.map(course => (
                                        <div className="col-md-4">
                                            <Card imgsrc={img1} course={course}/>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>)
                }
            </div>
        );
    }
}

export default Dashboard;