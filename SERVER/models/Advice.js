const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdviceSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  picture:{
    type: String,
    required: true,  
  },
  description: {
    type: String,
    required: true,
  },
  dateofcreation: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = Advice = mongoose.model("advice", AdviceSchema);
