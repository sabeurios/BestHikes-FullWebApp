import React, { useEffect, useState } from "react";
import {
  getEvent,
  bookEvent,
  updateLikes,
} from "../../Redux/actions/actionEvent";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Like from "./Like";
import jwt_decode from "jwt-decode";

import { makeStyles } from "@material-ui/core/styles";
// import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
// import Button from "@material-ui/core/Button";
import GoToHome from "../BackToHome.js/GoToHome";
import { Button, Confirm } from "semantic-ui-react"

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Event = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const [userID, setUserID] = useState("");
  const eventID = props.match.params.id;

  const [open, setopen] = useState(false);
  const handleOpen = () => {
    setopen(true);
  };
  const handleClose = () => {
    setopen(false);
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      setIsAuthenticated(true);
      setRole(decoded.role);
      setUserID(decoded.id);
      props.getEvent(eventID);
    }
  }, [props.currentEvent.like]);

  return (
    <div>
      <GoToHome />
      <div className="container" style={{marginTop:"5%"}}>
        <h1 className="my-4" style={{fontSize:"8vh", color:"black" ,fontWeight:"bold" , textTransform: "uppercase" , textAlign:"center"}}>{props.currentEvent.title}</h1>
        <div className="row">
          <center className="col-md-8" style={{backgroundColor:"#ffffffa1", padding:"2%"}}>
            <img className="img-fluid" src={props.currentEvent.cover} alt="" style={{width:"80vh",height:"80vh"}}/>

            <Like event={props.currentEvent} />
          </center>
          <div className="col-md-4" style={{backgroundColor:"#ffffffa1", paddingTop:"2%"}}>
            <h3 className="my-3" style={{ color:"#D01919" , fontWeight:"bold"}}>Event Description</h3>
            <p style={{fontSize:"3vh"}}>{props.currentEvent.desc}</p>
            <h3 className="my-3" style={{  color:"#D01919", fontWeight:"bold"}}>Event Details</h3>
            <ul style={{listStyle:"none"}}>
              <li style={{fontSize:"3vh"}}> <span style={{color:"#D01919"}}  >Organisator :</span>  {props.currentEvent.organisator}</li>
              <li style={{fontSize:"3vh"}}>
              <span style={{color:"#D01919"}}> From</span>  {props.currentEvent.depart} <span style={{color:"#D01919"}}> To</span>{" "}
                {props.currentEvent.destination}{" "}
              </li>
              <li style={{fontSize:"3vh"}}><span style={{color:"#D01919"}}>Date :</span> {props.currentEvent.date}</li>
              <li style={{fontSize:"3vh"}}><span style={{color:"#D01919"}}>Disponible Places :</span> {props.currentEvent.places}</li>
              <li style={{fontSize:"3vh"}}><span style={{color:"#D01919"}}>Price : </span>{props.currentEvent.price}</li>
            </ul>
            <center>
            <Button
            basic color='red'
                  onClick={() => {
                    if (isAuthenticated && role === "participant") {
                      handleOpen();
                    }
                    if (role === "organisator") {
                      alert(
                        "You can't book this event! your are an organisator and must be a participant"
                      );
                    }
                    if (!isAuthenticated) {
                      alert("Please login");
                      history.push('/login')
                    }
                  }}
                >
                  Book
                </Button>
                <Confirm
                content="Are you sure ? This operation is ireverrsible !!!"
                  style={{height: "20%",
                    position: "absolute",
                    top: "40%",
                    left:"25%"}}
                  open={open}
                  onCancel={()=>handleClose()}
                  onConfirm={() => {
                    props.bookEvent(userID, props.currentEvent._id);
                    handleClose();
                    history.push(`/cart/${userID}`);
                    
                  }}
                />
              
              {/* <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<AddShoppingCartIcon />}
                onClick={() => {
                  if (isAuthenticated && role === "participant") {
                    props.bookEvent(userID, props.currentEvent._id);
                    history.push(`/cart/${userID}`);
                  }
                  if (role === "organisator") {
                    alert(
                      "You can't book this event! your are an organisator and must be a participant"
                    );
                  }
                  if (!isAuthenticated) {
                    alert("Please login");
                  }
                }}
              >
                Book
              </Button> */}
            </center>
          </div>
        </div>
        
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  currentEvent: state.events.events,
  users: state.users.users,
});
export default connect(mapStateToProps, { getEvent, bookEvent, updateLikes })(
  Event
);
