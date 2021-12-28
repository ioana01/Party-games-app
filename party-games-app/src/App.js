import React from "react";
import { AuthProvider } from "./contexts/contexts";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";


function App() {
  return (
    <div className="align-items-center justify-content-center">
      <div className="w-100">
        <Router>
          <AuthProvider>
            <Navbar/>
            <Switch>
              {/* <Route exact path="/" component={} /> */}
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </div>
  )
}

export default App;