// const https = require("https");
const http = require("http");
const path = require("path");
const PORT = process.env.PORT || 5000;
const fs = require("fs");
const helmet = require("helmet");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const cookieSession = require("cookie-session");
const authRoutes = require("./routes/auth/auth.routes");
const { mongoConnect } = require("./services/dbConnection");
const { app } = require("./app");

async function startServer() {
  try {
    await mongoConnect();
    http
      .createServer(
        {
          // key: fs.readFileSync("key.pem"),
          // cert: fs.readFileSync("cert.pem"),
        },
        app
      )
      .listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
      });
  } catch (err) {
    console.log(err.message);
  }
}

startServer();
