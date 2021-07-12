const express = require("express");
const app = express();
const server = require("http").createServer(app);
// Util dependencies
const cors = require("cors"); // For Cross-Origin Requests
const path = require("path");

// Limit file upload size to 50 mb
app.use(express.json({limit: '50mb'}) );
app.use(cors());

const videoUploads = require("./routes/video-uploads");
app.use("/api/video", videoUploads);

app.use("/static", express.static(path.join(__dirname, "uploads")));

console.log("The server is running");

// Start listening to the server on the PORT 59899
server.listen(59899);