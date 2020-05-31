import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const CardGuider = () => {
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
  return (
    <div>
      <div className="row">
        <div className="col-md-2">
          <a href="/#">
            <img
              className="img-fluid rounded mb-3 mb-md-0"
              src="http://placehold.it/300x300"
              alt=""
            />
          </a>
        </div>
        <div className="col-md-5">
          <h3 style={{textTransform: "uppercase"}}>Guider 1</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium
            veniam exercitationem expedita laborum at voluptate. Labore,
            voluptates totam at aut nemo deserunt rem magni pariatur quos
            perspiciatis atque eveniet unde.
          </p>
        </div>
        {isAuthenticated && role === "admin" && (
          <div className="col-md-3">
            <Fab size="small" style={{ margin: "1%" }} aria-label="delete">
              <DeleteIcon />
            </Fab>
            <Fab
              size="small"
              color="secondary"
              style={{ margin: "1%" }}
              aria-label="edit"
            >
              <EditIcon />
            </Fab>
          </div>
        )}
      </div>
      <hr />
    </div>
  );
};

export default CardGuider;
