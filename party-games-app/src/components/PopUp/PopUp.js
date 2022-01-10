import React from "react";
import { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import "./PopUp.css";
import { auth, database } from "../../firebase";


function JoinRoom(props){
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      console.log("submit" + props.roomId);
        setError("");
        setLoading(true);
        /*await login(emailRef.current.value, passwordRef.current.value);
        if(CheckIfUserIsAdmin(emailRef.current.value)) {
            history.push("/admin")
        }
        else {
            history.push("/")
        } */
        await database.ref('rooms').once('value', snapshot => {
          snapshot.forEach(childSnapshot => {
              if (childSnapshot.key == props.roomId) {
                const childData = childSnapshot.val();
                console.log(passwordRef.current.value);
                console.log(childData["password"]);
                if (passwordRef.current.value == childData["password"]){
                  console.log("correct password");
                  {props.handleClose()}
                  {props.joinRoom()}
                } else {
                  setError("Incorrect password!");

                }
              }
          });
        });

    } catch(error) {
      setError(error.message);
    }  
    setLoading(false);
  }
  
  return (
    <div>
      <div>
      <h4 className="popup-title">This is a private room!</h4>
      </div>
      <Card id='card-container-login'>
        <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="password" style={{marginBottom: "20px"}}>
                  <Form.Label style = {{color:"black"}}>Room password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>

              <Button 
                  id="join room" 
                  disabled={loading} 
                  className="w-100 auth-button" type="submit" style={{backgroundColor: "#343a40"}}>
                  Join Room
              </Button>
            </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

function renderOption(props) {
  if (props.button === "Join room" ) {
    return JoinRoom(props);
  }
}

const MyPopUp = (props) => {
  return (props.trigger) ? (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        { renderOption(props) }
      </div>
    </div>
  ): "";
};

export default MyPopUp;
