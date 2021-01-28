import React, { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

import Button from "../Button";
import { dataURItoBlob } from "./utils";
import Message from "../Message";

import "./_index.scss";
import ToastsContainer from "../ToastsContainer";

type RecorderProps = {
  connection?: WebSocket;
  message?: any;
};

const Recorder: React.FunctionComponent<RecorderProps> = (props) => {
  const [processing, setProcessing] = useState<boolean>(false);
  const [response, setResponse] = useState();
  const [gesture, setGesture] = useState<string>();
  const [toasts, setToasts] = useState<any[]>([]);

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

  // useEffect(() => {
  //   if (props.message) {
  //     const plainSpans = props.message;
  //     console.log(plainSpans);
  //   }
  // }, [props.message]);

  const isJson = (str: any) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (processing) {
      const json = document.getElementById("json");
      if (json && isJson(props.message)) {
        const parsed = JSON.parse(props.message);
        const prettyJSON = JSON.stringify(parsed, null, 2);
        if (prettyJSON !== "null") {
          setGesture(prettyJSON);
          const newToast = { text: parsed.gesture };
          console.log(newToast);
          if (toasts.length === 0) {
            setToasts([newToast]);
            setTimeout(() => {
              setToasts([]);
            }, 500);
          }
        }
      } else {
        console.log("json error");
      }
    }
  }, [props.message, processing]);

  const takeSnapshot = (
    video: HTMLVideoElement,
    canvas: HTMLCanvasElement,
    connection: WebSocket
  ) => {
    // @ts-ignore
    const context = canvas.getContext("2d");
    // @ts-ignore
    canvas.width = video.videoWidth;
    // @ts-ignore
    canvas.height = video.videoHeight;
    if (context) {
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      // Write the canvas to an image
      // @ts-ignore
      const durl = canvas.toDataURL();
      const blob = dataURItoBlob(durl);
      // console.log(connection.readyState === connection.CLOSED);
      if (connection.readyState === connection.OPEN) {
        // console.log(blob);
        connection.send(blob);
      } else {
        console.log("\n[Err] connection closed\n");
      }
    }
  };

  const handleStartRecording = () => {
    console.log("handleStart", processing);

    if (!processing) {
      setProcessing(true);
      startCamera();
      setInterval(function () {
        const video: HTMLVideoElement = document.getElementById(
          "video"
        ) as HTMLVideoElement;
        if (video && canvasRef && canvasRef.current) {
          if (
            props.connection &&
            props.connection.readyState === props.connection.OPEN
          ) {
            takeSnapshot(video, canvasRef.current, props.connection);
          } else {
            console.log("error connection closed");
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
    // props.onStop && props.onStop();
  };

  return (
    <>
      <div className="home--screen">
        <div className="container">
          <video id="video">Video stream not available.</video>
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
            <span className="subtitle">Last recognized gesture</span>
            <pre id="json">{gesture}</pre>
          </div>
        </div>
      </div>
      {toasts.length && (
        <div className="popout">
          <ToastsContainer toasts={toasts} />
        </div>
      )}
    </>
  );
};

export default Recorder;
