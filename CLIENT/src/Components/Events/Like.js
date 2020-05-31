import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateLikes, updatedisLikes } from "../../Redux/actions/actionEvent";

import { Button, Icon, Label } from "semantic-ui-react";

const Like = (props) => {
  const [like, setlike] = useState(props.event.like);
  const [dislike, setdislike] = useState(props.event.dislike);
  
  useEffect(() => {
    setlike(props.event.like);
    setdislike(props.event.dislike);
  }, [props.event.like,props.event.dislike]);

  return (
    <div style={{margin:"2%"}}>
      <Button
        as="div"
        labelPosition="right"
        onClick={() => {
          setlike(like);
          props.updateLikes(props.event._id);
        }}
      >
        <Button color="red">
          <Icon name="heart" />
          Likes
        </Button>
        <Label as="a" basic color="red" pointing="left">
          {like}
        </Label>
      </Button>
      <Button
        as="div"
        labelPosition="right"
        onClick={() => {
          setdislike(dislike);
          props.updatedisLikes(props.event._id);
        }}
      >
        <Button color="yellow">
          <Icon name="fork" />
          Dislikes
        </Button>
        <Label as="a" basic color="yellow" pointing="left">
          {dislike}
        </Label>
      </Button>
    </div>
  );
};

export default connect(null, { updateLikes, updatedisLikes })(Like);
