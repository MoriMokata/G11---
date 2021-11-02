import React, { Fragment, useEffect, useState } from 'react';
import Body from "./components/LabResult/Body";
import Navbar from "./components/LabResult/Navbar";
import History from "./components/LabResult/History";
import SignIn from "./components/SignIn";
import PreloadScreenings from './components/Screening/HistoryScreening';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateScreening from './components/Screening/CreateScreening';
import NavbarNurse from "./components/Screening/NavbarNurse";

import Home from './components/LabResult/Home';

function App() {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      setToken(getToken);
    }
  }, []);

  if (!token) {
    return <SignIn />
  }
  
let CheckRole = String(localStorage.getItem("Role"));

  return (
    <div>
      <Router>
        {token && CheckRole === "MedicalTech" ? (
          <>
           <Fragment>
            <Navbar/>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/History" component={History} />
              <Route exact path="/link/body" component={Body} />
            </Switch>
          </Fragment>
          </>
        ) : (CheckRole === "Nurse" ? (
          <>
            <Fragment>
            <NavbarNurse />
            <Switch>
              <Route exact path="/" component={PreloadScreenings} />
              <Route exact path="/CreateScreening" component={CreateScreening} />
            </Switch>
          </Fragment>
          </>
        ) : (CheckRole === "Doctor" ? (
          <>
            <Navbar />
          </>
        ) : (CheckRole === "MedicalRecordOfficer" ? (
          <>
            <Navbar />
          </>
        ) : (<>{/* else condition */}</>))))
        }
      </Router>
    </div>

  );
}

export default App;