import React, { useEffect, useRef, useState } from "react";

import Button from "../Button";
import { takeSnapshot } from "./utils";
import Message from "../Message";

import "./_index.scss";

type HomeProps = {
  connection: WebSocket;
  processing: boolean;
  response: any;
  onStop: any;
};

const Home: React.FunctionComponent<HomeProps> = (props) => {
  const [processing, setProcessing] = useState<boolean>(props.processing);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const video: HTMLVideoElement = document.getElementById(
        "video"
      ) as HTMLVideoElement;
      const canvas: HTMLCanvasElement = document.getElementById(
        "canvas"
      ) as HTMLCanvasElement;

      if (canvas && video) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then(function (stream) {
            video.srcObject = stream;
            video.play();
          });
      }
    }
  };

  useEffect(() => {
    if (processing) {
      const json = document.getElementById("json");
      if (json) json.textContent = JSON.stringify(props.response, undefined, 2);
    }
  }, [props.response, props.processing]);

  const handleStartRecording = () => {
    if (!processing) {
      setProcessing(true);
      startCamera();
      setInterval(function () {
        if (!processing) {
          setProcessing(true);
          const video: HTMLVideoElement = document.getElementById(
            "video"
          ) as HTMLVideoElement;
          if (video && canvasRef && canvasRef.current) {
            takeSnapshot(video, canvasRef.current, props.connection);
          }
        }
      }, 100);
    }
  };

  const handleStopRecording = () => {
    const videoElem = document.getElementById("video");

    if (videoElem) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((mediaStream) => {
          const stream = mediaStream;
          const tracks = stream.getTracks();

          tracks.forEach((track) => track.stop());
        });

      // @ts-ignore
      videoElem.srcObject = null;
    }
    setProcessing(false);
    props.onStop && props.onStop();
  };

  console.log(processing);

  return (
    <div className="home--screen">
      <div className="container">
        {/*{processing ? (*/}
        <video id="video">Video stream not available.</video>
        {/*) : (*/}
        {/*  <Message header="Camera is not recording"></Message>*/}
        {/*)}*/}
        <canvas id="canvas" ref={canvasRef}></canvas>
      </div>
      <div className="feedback">
        <div className="controls">
          <Button
            className="is-primary"
            text="Start"
            onClick={handleStartRecording}
          />
          <Button
            className="is-warning"
            text="Stop"
            onClick={handleStopRecording}
          />
        </div>
        <div className="response">
          {!props.response ? (
            <Message header="No response" />
          ) : (
            <pre id="json"></pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
