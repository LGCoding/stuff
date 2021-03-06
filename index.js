let express = require("express");
let app = express();
let http = require("http").Server(app);
let io = require("socket.io")(http);
let fs = require("fs");

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
});