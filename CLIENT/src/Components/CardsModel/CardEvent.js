import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";

import "../Acceuil/cardEvent.css"
import ModalEvent from "../Modals/ModalEvent";
import { deleteEvent } from "../../Redux/actions/actionEvent";

import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";

const CardEvent = (props) => {
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      setIsAuthenticated(true);
      setRole(decoded.role);
      setUserName(decoded.userName);
    }
  }, [localStorage.getItem("token")]);

  return (
    <div className="custom-shadow col-lg-5 mb-4">
      <div className="card h-100">
        <a href="/#">
          <img className="card-img-top" src={props.event.cover} alt=""  height="300px" style={{opacity:"1 !important"}}/>
        </a>
        <div className="card-body" style={{ textAlign: "-webkit-center" }}>
          <h4 className="card-title">
            <a href="/#" style={{textTransform: "uppercase"}}>{props.event.title}</a>
          </h4>
          <p className="card-text">{props.event.date}</p>

          <button
            className="btn btn-danger"
            onClick={() => history.push(`/events/${props.event._id}`)}
          >
            read more
          </button>
          {((isAuthenticated && role === "admin") ||
            (isAuthenticated &&
              role === "organisator" &&
              props.event.organisator === userName)) && (
            <div
              style={{ display: "grid", gridTemplateColumns: "0.5fr 0.5fr" }}
            >
              <ModalEvent event={props.event} />
              <Fab
                size="small"
                aria-label="delete"
                onClick={() => props.deleteEvent(props.event._id)}
              >
                <DeleteIcon />
              </Fab>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default connect(null, { deleteEvent })(CardEvent);
