import React, { useEffect, useState } from "react";
import CardEvent from "../CardsModel/CardEvent";
import { getEvents } from "../../Redux/actions/actionEvent";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";

import "./cardEvent.css";
import ModalEvent from "../Modals/ModalEvent";

const Acceuil = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const [loading, setloading] = useState(true)

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      setIsAuthenticated(true);
      setRole(decoded.role);
    }
    setTimeout(() => {
      setloading(false)
    },500);
  }, [localStorage.getItem("token")]);

  return (
    <div className="container">
      <div
        className="custom-shadow card border-0 my-5"
        style={{ backgroundColor: "#ffffffa1" }}
      >
        <div className="card-body p-5">
          <div className="row" style={{ justifyContent: "space-around" }}>
            {props.events.map((event) => (
              <CardEvent key={event._id} event={event} />
            ))}
            {((isAuthenticated && role === "admin") ||
              (isAuthenticated && role === "organisator")) && (
              <center className="custom-shadow col-lg-5 mb-4">
                <center className="card h-100">
                  <ModalEvent add={true} />
                </center>
              </center>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  events: state.events.events,
});
export default connect(mapStateToProps, { getEvents })(Acceuil);
