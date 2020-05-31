const express = require("express");
const cors = require("cors");
const passport = require("passport");

const app = express();
const connectDB=require('./config/connectDB')

// Middlewares
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

// Passport Configuration
require("./middleware/passport")(passport);

//connectDB (config)
connectDB();

// localhost:5000/users/add_user
// localhost:5000/events/add
app.use("/events", require("./routes/event"));
app.use("/users", require("./routes/user"));
app.use("/advices", require("./routes/advice"));
app.use("/admin", require("./routes/admin"));

//run server
const port = process.env.PORT || 5000;
app.listen(port, (err) =>
  err ? console.log(err) : console.log(`Server connected on port ${port} ...`)
);
