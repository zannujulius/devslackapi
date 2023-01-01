const mongoose = require("mongoose");
require("dotenv").config();

// const MONGO_URL = `mongodb://localhost:27017/news`;
const MONGO_URL = `mongodb+srv://devslack:${process.env.DB_PASSWORD}@devslackcluster.ilptwzv.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Mongodb connection ready");
});

mongoose.connection.on("error", (error) => {
  console.error("An error occured on the db", error);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
