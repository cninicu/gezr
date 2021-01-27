import React, { useEffect, useState } from "react";

import Home from "./components/Home";

import "./App.scss";

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
    <div className="App">
      <Home connection={connection} message={response} />
    </div>
  );
};

export default App;
