import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getParticipants } from "../../Redux/actions/actionEvent";
import { getUsers } from "../../Redux/actions/actionUser";
import "./listParticipant.css"
import GoToHome from "../BackToHome.js/GoToHome";
const ListParticipants = (props) => {
  const idEvent = props.match.params.Myid;

  useEffect(() => {
    props.getParticipants(idEvent);
    props.getUsers();
  }, []);

  const tab = props.participant.map((e) =>
    props.users.filter((x) => x._id === e._id)
  );

  return (
    <div className="container" style={{marginTop:"5%"}}>
      <GoToHome/>
      <div
        className="custom-shadow card border-0 my-5  card-participant"
        style={{ opacity: "0.8" }}
      >
        <span className="list-participant-title">List Participant</span>
        {tab.map((a) =>
          a.map((x) => (
            <div className="list-Participant">
              <div className="participant-info"> <span className="span-info">Name : </span> {x.userName}</div>
              <div className="participant-info"><span className="span-info">Email : </span>{x.email}</div>
              <div className="participant-info"><span className="span-info">Phone : </span>{x.phone}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  participant: state.participant.participant,
  users: state.users.users,
});
export default connect(mapStateToProps, { getParticipants, getUsers })(
  ListParticipants
);
