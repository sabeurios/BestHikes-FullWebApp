import React from "react";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const MyEvent = (props) => {
  const classes = useStyles();
  let history = useHistory();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        marginTop: "3%",
        alignItems: "center",
      }}
    >
      <div>
        <div
          className="media"
          style={{ display: "flex", alignItems: "center" }}
        >
          <a className="thumbnail pull-left">
            {" "}
            <img
              className="media-object"
              src="http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png"
              style={{ width: "72px", height: "72px" }}
            />{" "}
          </a>
          <div className="media-body">
            <h5 className="media-heading" style={{margin:"1%"}}>
              <a>{props.eventss.title}</a>
            </h5>
          </div>
        </div>
      </div>
      <div>
        <strong>{props.eventss.date}</strong>
      </div>

      <div>
        <Button
          variant="contained"
          size="small"
          className={classes.button}
          onClick={() => history.push(`/MyEvents/${props.eventss._id}`)}
        >
          Get participants
        </Button>
      </div>
    </div>
  );
};
export default MyEvent;
