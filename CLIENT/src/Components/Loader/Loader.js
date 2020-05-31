import React from "react";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";

const Loading = (props) => {
  return (
    <div>
      {props.loading && (
        <div>
          <Dimmer active>
            <Loader content="Loading" />
          </Dimmer>
          <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        </div>
      )}
    </div>
  );
};
export default Loading;
