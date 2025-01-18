export function videoStream(stream: MediaStream) {
  console.log("sstart", stream);

  fetch("http://0.0.0.0:8000/video", {
    method: "POST",
  });
}
