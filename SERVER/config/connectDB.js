const mongoose = require("mongoose");
const config = require("config");

const connectDB = () => {
  mongoose
    .connect(config.get("mongoURI"), {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() =>
      console.log("MongoDB database connection established successfully ...")
    )
    .catch((err) => console.log("MongoDB database connection failed !!!"));
};

module.exports = connectDB;
