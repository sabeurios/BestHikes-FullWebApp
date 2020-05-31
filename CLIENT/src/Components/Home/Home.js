import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import "./home.css";

import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import { Button } from "semantic-ui-react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      setIsAuthenticated(true);
    }
  }, [localStorage.getItem("token")]);

  return (
    <header>
      {!isAuthenticated && (
        <div className="btn-auth">
          <Button.Group>
            <Button color="blue" onClick={() => history.push("/register")}>
              Register
            </Button>
            <Button.Or />
            <Button color="teal" onClick={() => history.push("/login")}>
              Login
            </Button>
          </Button.Group>
        </div>
      )}

      <a href="/acceuil" className="btn-go rainbow rainbow-5">
        Explore
      </a>
      {/* <video
        playsInline="playsinline"
        autoPlay="autoplay"
        muted="muted"
        loop="loop"
      >
        <source
          src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4"
          type="video/mp4"
        />
      </video> */}
    </header>
  );
};
export default Home;
