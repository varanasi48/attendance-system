const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Start webcam
navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => { video.srcObject = stream; })
  .catch((err) => { console.error("Webcam error:", err); });

function captureFace() {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageData = canvas.toDataURL("image/jpeg");
  const phone = document.getElementById("phone").value;

  fetch("https://<attendance-function-app>.azurewebsites.net/attendance", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phoneNumber: phone, faceImage: imageData })
  })
  .then(res => res.json())
  .then(data => console.log("Response:", data))
  .catch(err => console.error("Error:", err));
}
