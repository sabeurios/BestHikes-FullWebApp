const express = require("express");
const router = express.Router();

const Event = require("../models/Event");

// add event
router.post("/add", (req, res) => {
  const {
    title,
    organisator,
    price,
    depart,
    destination,
    date,
    cover,
    desc,
    places,
    like,
    dislike,
  } = req.body;
  const newEvent = new Event({
    title,
    organisator,
    price,
    depart,
    destination,
    date,
    cover,
    desc,
    places,
    like,
    dislike,
  });
  newEvent
    .save()
    .then((events) => res.send(events))
    .catch((err) => console.log(err));
});

// get All events
router.get("/", (req, res) => {
  Event.find()
    .then((events) => res.send(events))
    .catch((err) => console.log(err));
});

// get All organisator
router.get("/filterOrganisator", (req, res) => {
  Event.find(null, { organisator: 1 })
    .distinct("organisator")
    .then((events) => res.send(events))
    .catch((err) => console.log(err));
});

// get All destination
router.get("/filterDestination", (req, res) => {
  Event.find(null, { destination: 1 })
    .distinct("destination")
    .then((events) => res.send(events))
    .catch((err) => console.log(err));
});

// get All depart
router.get("/filterDepart", (req, res) => {
  Event.find(null, { depart: 1 })
    .distinct("depart")
    .then((events) => res.send(events))
    .catch((err) => console.log(err));
});

// get All destination
router.get("/filterDate", (req, res) => {
  Event.find(null, { date: 1 })
    .distinct("date")
    .then((events) => res.send(events))
    .catch((err) => console.log(err));
});

// get events by idEvent
router.get("/:_id", (req, res) => {
  const { _id } = req.params;
  Event.findOne({ _id })
    .then((events) => res.send(events))
    .catch((err) => console.log(err));
});

// delete event by id
router.delete("/:_id", (req, res) => {
  const { _id } = req.params;
  Event.findOneAndDelete({ _id: _id })
    .then((events) => res.send("success"))
    .catch((err) => console.log(err));
});

// update Event
router.put("/:_id", (req, res) => {
  const { _id } = req.params;
  const {
    title,
    organisator,
    price,
    depart,
    destination,
    date,
    cover,
    desc,
    places,
    like,
    dislike,
  } = req.body;
  Event.findOneAndUpdate(
    { _id },
    {
      $set: {
        title,
        organisator,
        price,
        depart,
        destination,
        date,
        cover,
        desc,
        places,
        like,
        dislike,
      },
    }
  )
    .then((events) => res.send("event Updated"))
    .catch((err) => console.log(err));
});

// Filter events by(org||dest||depart||date)
router.get("/findEvents/:query", (req, res) => {
  var query = req.params.query;

  Event.find({
    $or: [
      { organisator: query },
      { destination: query },
      { depart: query },
      // { 'price': { $gte: query} }, //not solved
      { date: query },
    ],
  })
    .then((events) => res.send(events))
    .catch((err) => console.log(err));
});

// book event to shopping cart
router.get("/book/:idUser/:idEvent", (req, res) => {
  const _id = req.params.idUser;
  const _idEvent = req.params.idEvent;

  Event.findOneAndUpdate(
    { _id: _idEvent },
    {
      $addToSet: {
        participant: { _id },
      },
      // $inc: { places: -1 },
    }
  )
    .then((event) => res.json(event))
    .catch((err) => res.json(err));
});

// update places in shopping cart
router.put("/book/:idEvent/:places", (req, res) => {
  const _id = req.params.idEvent;
  const places = req.params.places;

  Event.findOneAndUpdate(
    { _id },
    {
      $set: { places },
    },
    { new: true }
  )
    .then((event) => res.json(event))
    .catch((err) => res.json(err));
});

// update likes
router.put("/like/:idEvent", (req, res) => {
  const _id = req.params.idEvent;

  Event.findOneAndUpdate(
    { _id },
    {
      $inc: { like: 1 },
    },
    { new: true }
  )
    .then((event) => res.json(event))
    .catch((err) => res.json(err));
});
// update dislikes
router.put("/dislike/:idEvent", (req, res) => {
  const _id = req.params.idEvent;

  Event.findOneAndUpdate(
    { _id },
    {
      $inc: { dislike: 1 },
    },
    { new: true }
  )
    .then((event) => res.json(event))
    .catch((err) => res.json(err));
});


router.get("/participantInEvent/:_id", (req, res) => {
  const { _id } = req.params;
  Event.find({ _id },{participant:1})
    .distinct("participant")
    .then((events) => res.send(events))
    .catch((err) => console.log(err));
});

module.exports = router;

