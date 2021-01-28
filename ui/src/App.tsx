import React, { useEffect, useState } from "react";

import Home from "./components/Home";

import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Recorder from "./components/Recorder";
import Query from "./components/Query";
type AppProps = {};

const App: React.FunctionComponent<AppProps> = (props) => {
  const [connection, setConnection] = useState<WebSocket>();
  const [response, setResponse] = useState();

  useEffect(() => {
    const connection = new WebSocket("ws://127.0.0.1:8000/");

    connection.onopen = () => {
      console.log("connection established");
    };

    connection.onmessage = (event) => {
      setResponse(event.data);
      // console.log("Received: " + event.data);
    };

    setConnection(connection);
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/record">
          <Recorder connection={connection}></Recorder>
        </Route>
        <Route path="/query">
          <Query />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
