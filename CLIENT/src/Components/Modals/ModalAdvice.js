import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import jwt_decode from "jwt-decode";

import { addAdvice, updateAdvice } from "../../Redux/actions/actionAdvice";

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
const ModalAdvice = (props) => {
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
    }
  }, []);

  const classes = useStyles();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState(props.add ? "" : props.advice.title);
  const [picture, setPicture] = useState(props.add ? "" : props.advice.picture);
  const [description, setDescription] = useState(
    props.add ? "" : props.advice.description
  );
  const [updatedAdvice, setUpdatedAdvice] = useState(props.advice);

  const addNewAdvice = () => {
    props.addAdvice({
      title,
      picture,
      description,
    });
    setTitle("");
    setPicture("");
    setDescription("");
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
        <label htmlFor="fname">Advice Title</label>
        <input
          type="text"
          value={props.add ? title : updatedAdvice.title}
          onChange={(e) =>
            props.add
              ? setTitle(e.target.value)
              : setUpdatedAdvice({ ...updatedAdvice, title: e.target.value })
          }
        />
        <label htmlFor="fname">Advice Picture</label>
        <input
          type="text"
          value={props.add ? picture : updatedAdvice.picture}
          onChange={(e) =>
            props.add
              ? setPicture(e.target.value)
              : setUpdatedAdvice({ ...updatedAdvice, picture: e.target.value })
          }
        />
        <label htmlFor="fname">Advice description</label>
        <input
          type="text"
          value={props.add ? description : updatedAdvice.description}
          onChange={(e) =>
            props.add
              ? setDescription(e.target.value)
              : setUpdatedAdvice({
                  ...updatedAdvice,
                  description: e.target.value,
                })
          }
        />
        <div className="btn-modal">
          <button
            className="btn btn-danger float-right"
            onClick={() => setModalIsOpen(false)}
          >
            close
          </button>
          <button
            className="btn btn-primary float-right"
            onClick={() => {
              props.add
                ? addNewAdvice()
                : props.updateAdvice(props.advice._id, updatedAdvice);
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
export default connect(null, { addAdvice, updateAdvice })(ModalAdvice);
