import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";

import CardAdvice from "../CardsModel/CardAdvice";
import { getAdvices, addAdvice } from "../../Redux/actions/actionAdvice";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import "./advice.css";
import ModalAdvice from "../Modals/ModalAdvice";

const Advice = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      setIsAuthenticated(true);
      setRole(decoded.role);
      props.getAdvices();
    }
  }, []);
  return (
    <div className="container">
      <div className="card border-0 shadow my-5">
        <center className="container">
          <h1 className="font-weight-light text-center text-lg-left mt-4 mb-0">
            Our Advices For You
          </h1>
          <hr className="mt-2 mb-5" />
          <div className="container-card">
            {props.advices.map((adv) => (
              <CardAdvice advice={adv} />
            ))}
            {isAuthenticated && ((role === "admin") || (role ==="organisator")) && (
              <center>
                <ModalAdvice add={true} />
              </center>
            )}
          </div>
        </center>
      </div>
    </div>
  );
};
const mapStateToPros = (state) => ({
  advices: state.advices.advices,
});
export default connect(mapStateToPros, { getAdvices, addAdvice })(Advice);
