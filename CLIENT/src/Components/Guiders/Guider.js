import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

import CardGuider from "../CardsModel/CardGuider";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const Guider = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      setIsAuthenticated(true);
      setRole(decoded.role);
    }
    
  }, []);
  return (
      <center class="container">
        <h1 class="my-4">Our Professionnal Guiders</h1>
        <hr/>
        <CardGuider />
        <CardGuider />
        {isAuthenticated && role === ("admin" || "organisator") && (
          <Fab
            size="small"
            color="primary"
            style={{ margin: "1%" }}
            aria-label="add"
          >
            <AddIcon />
          </Fab>
        )}
      </center>
  );
};

export default Guider;
