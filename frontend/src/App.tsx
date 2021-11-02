import React, { Fragment, useEffect, useState } from 'react';
import Body from "./components/LabResult/Body";
import Navbar from "./components/LabResult/Navbar";
import History from "./components/LabResult/History";
import SignIn from "./components/SignIn";
import PreloadScreenings from './components/Screening/HistoryScreening';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateScreening from './components/Screening/CreateScreening';
import NavbarNurse from "./components/Screening/NavbarNurse";
import HomeScreening from './components/Screening/HomeScreening';
import CreateDrugAllergy from './components/DrugAllergy/CreateDrugAllergy';

import Home from './components/LabResult/Home';
import HistoryDrugAllgergy from './components/DrugAllergy/HistoryDrugAllgergy';

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
              <Route exact path="/" component={HomeScreening}/>
              <Route exact path="/HistoryScreenings" component={PreloadScreenings} />
              <Route exact path="/CreateScreening" component={CreateScreening} />
              <Route exact path="/CreateDrugAllergy" component={CreateDrugAllergy} />
              <Route exact path="/HistoryDrugAllgergy" component={HistoryDrugAllgergy} />
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