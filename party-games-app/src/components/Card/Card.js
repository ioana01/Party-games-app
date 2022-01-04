import React from 'react';
import { Link } from "react-router-dom";
import './card.css';

const Card = props => {

  return(
    <div className="card text-center shadow">
      <div className="overflow">
        <img src={props.imgsrc} alt="Image 1" className='card-img-top'/>
      </div>
      
      <div className="card-body text-dark">
        <h4 className="card-title">Camera: { props.room.name }</h4>
        <p className="card-text text-secondary"> Game: { props.room.game } </p>
        <p className="card-text text-secondary"> Game state: { props.room.state } </p>
        <p className="card-text text-secondary"> Room type: { props.room.type } </p>
        <p className="card-text text-secondary"> Admin: { props.room.admin_name } </p>
        <p className="card-text text-secondary"> Users number: { props.room.current_users_number } </p>
        <p className="card-text text-secondary"> Max users number: { props.room.max_users_number } </p>
        
        <Link className="btn btn-outline-success" to={{pathname: `/room/${props.id}`}}> More info </Link>
      </div>
    </div>
  );
}
  
export default Card;