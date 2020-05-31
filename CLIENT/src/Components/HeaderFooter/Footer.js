import React from "react";

import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";

const Footer = () => {
  return (
    <footer
      className="font-small pt-4 mt-4"
      style={{ backgroundColor: "transparent",display:"flex",flexDirection:"column",alignItems:"center", }}
    >
      <div style={{ display:"flex",alignItems:"center"}}>
      <h6>Made with <span style={{color: "#D9534F", fontSize:"20px"}}>♥</span> by:</h6>
      <AvatarGroup max={2}>
        <Avatar alt="Saber Chikhaoui" src="/static/images/avatar/1.jpg" style={{zIndex:"-1"}} />
        <Avatar alt="Wael Kefi" src="/static/images/avatar/2.jpg" style={{zIndex:"-1"}}/>
      </AvatarGroup>
      </div>
     

      <div className="footer-copyright text-center py-2">
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="/">
            BestHikes
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </div>
      </footer>
  );
};

export default Footer;
