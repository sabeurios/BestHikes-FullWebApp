const express = require("express");
const router = express.Router();

const Advice = require("../models/Advice");

// add advice
router.post("/add", (req, res) => {
  const { title, picture, description } = req.body;
  const newAdvice = new Advice({
    title,
    picture,
    description,
  });
  newAdvice
    .save()
    .then((advice) => res.send(advice))
    .catch((err) => console.log(err));
});

// get All advices
router.get("/", (req, res) => {
  Advice.find()
    .then((advices) => res.send(advices))
    .catch((err) => console.log(err));
});

// delete advice by id
router.delete("/:_id", (req, res) => {
  const { _id } = req.params;
  Advice.findOneAndDelete({ _id })
    .then((advice) => res.send("success"))
    .catch((err) => console.log(err));
});

// update advice
router.put("/:_id", (req, res) => {
  const { _id } = req.params;
  const { title, picture, description } = req.body;
  Advice.findOneAndUpdate(
    { _id },
    {
      $set: {
        title,
        picture,
        description,
      },
    }
  )
    .then((advice) => res.send("advice Updated"))
    .catch((err) => console.log(err));
});

module.exports = router;
