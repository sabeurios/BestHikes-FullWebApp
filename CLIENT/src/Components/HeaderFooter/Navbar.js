import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

import AvatarProfile from "../Profile/AvatarProfile";

import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import PageviewIcon from "@material-ui/icons/Pageview";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import BuildIcon from "@material-ui/icons/Build";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import "./nav.css"
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  events: {
    backgroundColor: "#880e4f",
  },
  advices: {
    backgroundColor: "#00acc1",
  },
  build: {
    backgroundColor: "#8e24aa",
  },
  about: {
    backgroundColor: "#f44336",
  },
  cart: {
    backgroundColor: "#cddc39",
  },
  login: {
    backgroundColor: "#f57f17",
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const Navbar = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setIsAuthenticated(true);
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      setUserID(decoded.id);
      setUserName(decoded.userName);
      setRole(decoded.role);
    }
  }, [localStorage.getItem("token")]);

  return (

    <nav className="navbar navbar-expand-lg  static-top mb-5 shadow navStyle" >

      <div className="container">
        <a href="/acceuil">
        <img
            style={{ width: "7%", height: "7%" }}
            alt=""
            src="https://s3.amazonaws.com/ClubExpressClubFiles/306748/graphics/hiking-badge-Mstraight_1226481288.png"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            {isAuthenticated && (role === "organisator" || role === "admin") && (
              <li className="nav-item">
                <a className="nav-link">
                  <center>
                    <span style={{color:"#D9534F"}}>MyEvents</span>
                    <Avatar
                      className={classes.login}
                      onClick={() => history.push("/MyEvents")}
                    >
                      <EventAvailableIcon />
                    </Avatar>
                  </center>
                </a>
              </li>
            )}
            <li className="nav-item">
              <a className="nav-link" href="/filterEvents">
                <div>
                  <span>Search</span>
                  <Avatar className={classes.events}>
                    <PageviewIcon />
                  </Avatar>
                </div>
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/guiders">
                <div>
                  <span>Guiders</span> <Avatar src="/broken-image.jpg" />
                </div>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/advices">
                <div>
                  <span>Advices</span>
                  <Avatar className={classes.advices}>
                    <AssignmentIcon />
                  </Avatar>
                </div>
              </a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="/about">
                <div>
                  <span>About</span>
                  <Avatar className={classes.about}>
                    <HomeWorkIcon />
                  </Avatar>
                </div>
              </a>
            </li> */}

            {isAuthenticated && (
              <li className="nav-item">
                <a className="nav-link">
                  <div>
                    {" "}
                    <span style={{color:"#D9534F"}}>Cart</span>
                    <Avatar
                      className={classes.cart}
                      onClick={() => history.push(`/cart/${userID}`)}
                    >
                      <StyledBadge color="secondary">
                        <ShoppingCartIcon />
                      </StyledBadge>
                    </Avatar>
                  </div>
                </a>
              </li>
            )}
            {isAuthenticated && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link"
                  href="/#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div>
                    <span>Setting</span>
                    <Avatar className={classes.build}>
                      <BuildIcon />
                    </Avatar>
                  </div>
                </a>
                <center
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdown"
                >
                  <a className="dropdown-item" href="/Profile">
                    <AvatarProfile userName={userName} />
                  </a>
                  <div className="dropdown-divider"></div>
                  <a
                    className="dropdown-item"
                    href="/login"
                    onClick={() => localStorage.removeItem("token")}
                  >
                    Logout
                  </a>
                </center>
              </li>
            )}
            {!isAuthenticated && (
              <li className="nav-item">
                <a className="nav-link">
                  Login
                  <Avatar
                    className={classes.login}
                    onClick={() => history.push("/login")}
                  >
                    <OpenInNewIcon />
                  </Avatar>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
const mapStateToProps = (state) => ({
  events: state.events.events,
});
export default connect(mapStateToProps)(Navbar);
