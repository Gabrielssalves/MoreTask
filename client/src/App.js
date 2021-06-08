import './App.css';
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Workflow from "./components/workflow/Workflow";
import TaskScreen from "./components/workflow/TaskScreen";

import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Sidebar />
          <div className="container d-flex justify-content-center">
            <Route exact path="/task" component={TaskScreen} />
            <Route exact path="/" component={Workflow} />
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
