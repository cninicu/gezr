export const takeSnapshot = (
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
    connection.readyState === connection.OPEN && connection.send(blob);
  }
};

export const dataURItoBlob = (dataURI: any) => {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else byteString = unescape(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
};
