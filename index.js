const express = require("express");
const app = express();
const language_router = require("./routers/language_router");
const nunjucks = require("nunjucks");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");

nunjucks.configure("./views", {
  autoescape: true,
  express: app,
});

// app.use(cookieParser())
// app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", language_router);

app.use(express.static("public"));

app.use(connectLiveReload());
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Express server listening on http://localhost:%d in %s mode",
    this.address().port,
    app.settings.env
  );
});
