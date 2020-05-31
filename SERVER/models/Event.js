const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: { type: String },
  organisator: { type: String },
  price: { type: Number },
  depart: { type: String },
  destination: { type: String },
  date: { type: String },
  cover: { type: String },
  desc: { type: String },
  places: { type: Number, default: 0 },
  participant: { type: Array, default: [] },
  like: { type: Number, default: 0 },
  dislike: { type: Number, default: 0 },
  dateofcreation: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = Event = mongoose.model("event", EventSchema);
