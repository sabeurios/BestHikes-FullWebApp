import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import axios from "axios";

import "./profile.css";
import { updateUser, getUser } from "../../Redux/actions/actionUser";

import { Input } from "semantic-ui-react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";
import Avatar from '@material-ui/core/Avatar';
import { getEvent } from "../../Redux/actions/actionEvent";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Profile = (props) => {
  const classes = useStyles();

  const [isEditable, setIsEditable] = useState(false);
  const [userID, setUserID] = useState();
  const [userName, setUserName] = useState();
  const [userPassword, setUserPassword] = useState(props.props.password)
  const [userRole, setUserRole] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userPicture, setUserPicture] = useState();
  const [userPhone, setUserPhone] = useState(props.props.phone);
  const [userAdress, setUserAdress] = useState(props.props.adress);
  const [updatedUser, setUpdatedUser] = useState({
    phone: userPhone,
    adress: userAdress,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    setUserID(decoded.id);
    setUserName(decoded.userName);
    setUserPassword(decoded.password)
    setUserRole(decoded.role);
    setUserEmail(decoded.email);
    setUserPicture(decoded.profilePicture);
    setUpdatedUser({ phone: decoded.phone, adress: decoded.adress, password:decoded.password });
  }, []);

  return (
    <div className="wrapper" style={{top:"58%", width:"78vh", height:"80vh"}}>
      <center className="left">
        {/* <img src={userPicture} alt={userName} width={100} /> */}
        <Avatar alt={userName} style={{marginLeft: "45px", marginBottom:"20px"}} />
        <h6>{userName}</h6>
        <p>{userRole}</p>
      </center>
      <div className="right">
        <div className="info">
          <h3>Profil</h3>
          <div className="info_data" style={{paddingTop:"10vh"}}>
            <div className="data">
              <h6>Email</h6>
              <p>{userEmail}</p>
            </div>
            <div className="data">
              <h6>Password</h6>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "230%",
                  justifyContent: "space-between",
                }}
              >
                {isEditable ? (
                  <Input
                    type="password"
                    value={userPassword}
                    onChange={(event) => {
                      setUserPassword(event.target.value);
                      setUpdatedUser({
                        ...updatedUser,
                        password: event.target.value,
                      });
                    }}
                  />
                ) : (
                  <p>Your Password</p>
                )}
              </div>
            </div>
            <div className="data">
              <h6>Phone</h6>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "230%",
                  justifyContent: "space-between",
                }}
              >
                {isEditable ? (
                  <Input
                    type="tel"
                    value={userPhone}
                    onChange={(event) => {
                      setUserPhone(event.target.value);
                      setUpdatedUser({
                        ...updatedUser,
                        phone: event.target.value,
                      });
                    }}
                  />
                ) : (
                  <p>{userPhone}</p>
                )}
              </div>
            </div>
            <div className="data">
              <h6>Adress</h6>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "230%",
                  justifyContent: "space-between",
                }}
              >
                {isEditable ? (
                  <Input
                    type="text"
                    value={userAdress}
                    onChange={(event) => {
                      setUserAdress(event.target.value);
                      setUpdatedUser({
                        ...updatedUser,
                        adress: event.target.value,
                      });
                      props.getUser(userID);
                    }}
                  />
                ) : (
                  <p>{userAdress}</p>
                )}
              </div>
            </div>

            <center>
              {isEditable && (
                <div>
                <Button
                  variant="contained"
                  size={isEditable?"medium":"small"}
                  className={classes.button}
                  startIcon={<CancelIcon />}
                  onClick={() => {
                    setIsEditable(!isEditable);
                  }}
                >
                  cancel
                </Button>
                <Button
                variant="contained"
                color="primary"
                size="medium"
                className={classes.button}
                startIcon={<SaveIcon />}
                onClick={() => {
                  props.updateUser(userID, updatedUser);
                  setIsEditable(!isEditable);
                }}
              >
                save
              </Button>
              </div>
              )}
              {!isEditable&&<Button
                variant="contained"
                color= "secondary"
                size="medium"
                className={classes.button}
                startIcon={<EditIcon />}
                onClick={() => {
                  setIsEditable(!isEditable);
                }}
              >
                edit
              </Button>}
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.user.user,
});
export default connect(mapStateToProps, { updateUser, getUser })(Profile);
