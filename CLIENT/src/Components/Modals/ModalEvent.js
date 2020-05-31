import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import jwt_decode from "jwt-decode";

import "./modalEditEvent.css";
import { addEvent, updateEvent } from "../../Redux/actions/actionEvent";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));
const ModalAddEdit = (props) => {
  const [organisatorName, setOrganisatorName] = useState("");
  console.log("org:" + organisatorName);
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      setOrganisatorName(decoded.userName);
    }
  }, []);

  const classes = useStyles();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [organisator, setOrganisator] = useState("");
  const [price, setPrice] = useState(0);
  const [depart, setDepart] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [cover, setCover] = useState("");
  const [desc, setDescription] = useState("");
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  const [places, setPlaces] = useState(0);
  const [updatedEvent, setUpdatedEvent] = useState(props.event);

  const addNewEvent = () => {
    props.addEvent({
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

    setTitle("");
    setOrganisator("");
    setDepart("");
    setDestination("");
    setDate("");
    setCover("");
    setDescription("");
    setPrice(0);
    setLike(0);
    setDislike(0);
    setPlaces(0);
  };
  return (
    <div>
      <Fab
        size="small"
        color={props.add ? "primary" : "secondary"}
        aria-label={props.add ? "add" : "edit"}
        onClick={() => setModalIsOpen(true)}
      >
        {props.add ? <AddIcon /> : <EditIcon />}
      </Fab>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="myModal"
        contentLabel="Example Modal"
      >
        <label htmlFor="fname">Event Title</label>
        <input
          type="text"
          value={props.add ? title : updatedEvent.title}
          onChange={(e) =>
            props.add
              ? setTitle(e.target.value)
              : setUpdatedEvent({ ...updatedEvent, title: e.target.value })
          }
        />
        <label htmlFor="fname">Event Organisator</label>
        {props.add ? (
          <input
            type="text"
            placeholder={organisatorName}
            onChange={(e) => setOrganisator(e.target.value)}
          />
        ) : (
          <input
            type="text"
            value={organisatorName}
            onChange={(e) =>
              setUpdatedEvent({
                ...updatedEvent,
                organisator: e.target.value,
              })
            }
          />
        )}
        <label htmlFor="fname">Event Price</label>
        <input
          type="text"
          value={props.add ? price : updatedEvent.price}
          onChange={(e) =>
            props.add
              ? setPrice(e.target.value)
              : setUpdatedEvent({ ...updatedEvent, price: e.target.value })
          }
        />
        <label htmlFor="fname">Event Depart</label>
        <input
          type="text"
          value={props.add ? depart : updatedEvent.depart}
          onChange={(e) =>
            props.add
              ? setDepart(e.target.value)
              : setUpdatedEvent({ ...updatedEvent, depart: e.target.value })
          }
        />
        <label htmlFor="fname">Event Destination</label>
        <input
          type="text"
          value={props.add ? destination : updatedEvent.destination}
          onChange={(e) =>
            props.add
              ? setDestination(e.target.value)
              : setUpdatedEvent({
                  ...updatedEvent,
                  destination: e.target.value,
                })
          }
        />
        <label htmlFor="fname">Event Date</label>
        {/* <form className={classes.container} noValidate> */}
        <TextField
          id="date"
          type="date"
          defaultValue="2017-05-24"
          value={props.add ? date : updatedEvent.date}
          onChange={(e) =>
            props.add
              ? setDate(e.target.value)
              : setUpdatedEvent({ ...updatedEvent, date: e.target.value })
          }
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <label htmlFor="fname">Event Cover</label>
        <input
          type="text"
          value={props.add ? cover : updatedEvent.cover}
          onChange={(e) =>
            props.add
              ? setCover(e.target.value)
              : setUpdatedEvent({ ...updatedEvent, cover: e.target.value })
          }
        />
        <label htmlFor="fname">Event likes</label>
        <input
          type="number"
          value={props.add ? like : updatedEvent.like}
          onChange={(e) =>
            props.add
              ? setLike(e.target.value)
              : setUpdatedEvent({ ...updatedEvent, like: e.target.value })
          }
        />
        <label htmlFor="fname">Event dislikes</label>
        <input
          type="number"
          value={props.add ? dislike : updatedEvent.dislike}
          onChange={(e) =>
            props.add
              ? setDislike(e.target.value)
              : setUpdatedEvent({ ...updatedEvent, dislike: e.target.value })
          }
        />
        <label htmlFor="fname">Event Description</label>
        <input
          type="text"
          value={props.add ? desc : updatedEvent.desc}
          onChange={(e) =>
            props.add
              ? setDescription(e.target.value)
              : setUpdatedEvent({ ...updatedEvent, desc: e.target.value })
          }
        />
        <label htmlFor="fname">Event Places</label>
        <input
          type="text"
          value={props.add ? places : updatedEvent.places}
          onChange={(e) =>
            props.add
              ? setPlaces(e.target.value)
              : setUpdatedEvent({ ...updatedEvent, places: e.target.value })
          }
        />
        <div className="btn-modal">
          <button
          style={{border:"1px solid white"}}
            className="btn btn-danger float-right"
            onClick={() => setModalIsOpen(false)}
          >
            close
          </button>
          <button
          style={{border:"1px solid white"}}
            className="btn btn-primary float-right"
            onClick={() => {
              props.add
                ? addNewEvent()
                : props.updateEvent(props.event._id, updatedEvent);
              setModalIsOpen(false);
            }}
          >
            {props.add ? "Add" : "Save changes"}
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default connect(null, { addEvent, updateEvent })(ModalAddEdit);
