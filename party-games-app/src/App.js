import React from "react";
import { AuthProvider } from "./contexts/contexts";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Dashboard from './components/rooms-dashboard/rooms-dashboard';
import PrivateRoute from "./components/private-route/private-route";
import ExtendedInfo from "./components/extended-room-info/extended-room-info";
import Login from "./components/Auth/Login/Login";
import SignUp from "./components/Auth/SignUp/SignUp";
import NewRoom from "./components/newRoom/newRoom";
function App() {
  return (
    <div className="align-items-center justify-content-center">
      <div className="w-100">
        <Router>
          <AuthProvider>
            <Navbar/>
            <Switch>  
              <Route exact path="/login" component={Login}/>
              <Route exact path="/signup" component={SignUp}/>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute exact path="/room/:id" component={ExtendedInfo}/>
              <PrivateRoute exact path="/newRoom" component={NewRoom}/>
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </div>
  )
}

export default App;