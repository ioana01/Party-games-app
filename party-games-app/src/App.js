import React from "react";
import { AuthProvider } from "./contexts/contexts";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Dashboard from './components/rooms-dashboard/rooms-dashboard';
import PrivateRoute from "./components/private-route/private-route";
import ExtendedInfo from "./components/extended-room-info/extended-room-info";

function App() {
  return (
    <div className="align-items-center justify-content-center">
      <div className="w-100">
        <Router>
          <AuthProvider>
            <Navbar/>
            <Switch>  
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/room/:id" component={ExtendedInfo}/>
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </div>
  )
}

export default App;