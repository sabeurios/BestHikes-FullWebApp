import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";

import { deleteAdvice, updateAdvice } from "../../Redux/actions/actionAdvice";

import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ModalAdvice from "../Modals/ModalAdvice";

const CardAdvice = (props) => {
  const [expanded, setExpanded] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      setIsAuthenticated(true);
      setRole(decoded.role);
    }
  }, [localStorage.getItem("token")]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div style={{ marginBottom: "15%" }}>
      <a>
        <img
          className="img-fluid rounded mb-3 mb-md-0"
          src={props.advice.picture}
          alt={props.advice.title}
          style={{height:"45vh"}} 
        />
      </a>
      <center
        className="rounded mb-3 mb-md-0"
        style={{ backgroundColor: "palegoldenrod", width: "300px" }}
      >
        {((isAuthenticated && role === "admin") ||
          (isAuthenticated && role === "organisator")) && (
          <div style={{ display: "grid", gridTemplateColumns: "0.5fr 0.5fr" }}>
            <ModalAdvice advice={props.advice} />
            <Fab
              size="small"
              style={{ margin: "1%" }}
              aria-label="delete"
              onClick={() => props.deleteAdvice(props.advice._id)}
            >
              <DeleteIcon />
            </Fab>
          </div>
        )}

        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          style={{ color: "teal" }}
        >
          <ExpandMoreIcon />
        </IconButton>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph style={{ textTransform: "uppercase" }}>
              {props.advice.description}
            </Typography>
          </CardContent>
        </Collapse>
      </center>
    </div>
  );
};
export default connect(null, { deleteAdvice, updateAdvice })(CardAdvice);
