import './App.css';
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Workflow from "./components/workflow/Workflow";

import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Sidebar />
        <div className="container d-flex justify-content-center">
          <Route exact path="/workflow" component={Workflow} />
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
