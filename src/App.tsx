import React, { useEffect, useState } from "react";

import Home from "./components/Home";

import "./App.scss";

type AppProps = {};

const App: React.FunctionComponent<AppProps> = (props) => {
  const [connection, setConnection] = useState<WebSocket>();
  const [processing, setProcessing] = useState(false);
  const [response, setResponse] = useState();

  useEffect(() => {
    const connection = new WebSocket("ws://localhost:8080/websocket");

    setConnection(connection);

    connection.onopen = () => {
      console.log("connection established");
      setProcessing(true);
    };

    connection.onmessage = (event: MessageEvent) => {
      console.log(event.data);
      if (event.data != "error" && processing) {
        const parsedData = JSON.parse(event.data);
        if (parsedData) setResponse(parsedData);
      }
    };
  });

  return (
    <div className="App">
      {connection && (
        <Home
          response={response}
          processing={processing}
          connection={connection}
          onStop={() => setProcessing(false)}
        />
      )}
    </div>
  );
};

export default App;
