const mongoose = require("mongoose");

const MONGO_URL = `mongodb://localhost:27017/news`;

mongoose.connect(MONGO_URL);

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
