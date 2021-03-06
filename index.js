const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const fs = require("fs");
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

app.set("port", process.env.PORT || 8080);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.use(express.static(__dirname + "/public"));


io.on("connection", function (socket) {
    socket.on("disconnection", () => {

    });
    socket.on("isDev", function () {
        if (process.env.NODE_ENV === "development") {
            socket.emit("wasDev");
        }
    });
});

http.listen(app.get("port"), function () {
  console.log("listening on port " + app.get("port"));
  readCommands();
});

function readCommands() {
  rl.question('Please Enter Command: \n', (answer) => {
    console.log(`${answer}`);
  });
}