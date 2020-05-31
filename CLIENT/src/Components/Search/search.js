import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  filterEvents,
  getEventsOrganisators,
  getEventsDestinations,
  getEventsDeparts,
  getEventsDates,
} from "../../Redux/actions/actionEvent";

import CardEvent from "../CardsModel/CardEvent";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Search = (props) => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    props.getEventsOrganisators();
    props.getEventsDestinations();
    props.getEventsDeparts();
    props.getEventsDates();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.filterEvents(searchValue);
  };

  return (
    <center>
      <div className="container">
        <div className="card border-0 shadow my-5"
        style={{ backgroundColor: "#ffffffa1" }}>
          <div className="card-body p-5">
            <form onSubmit={handleSubmit}>
              <FormControl
                onSubmit={handleSubmit}
                className={classes.formControl}
                color="secondary"
              >
                <InputLabel style={{color:"black"}}>By Organiser</InputLabel>
                <Select
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                >
                  {props.organisator.map((elt) => (
                    <MenuItem value={elt}>{elt}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>Select an Organiser</FormHelperText>
              </FormControl>

              <FormControl className={classes.formControl} color="secondary">
                <InputLabel style={{color:"black"}}>By Depart</InputLabel>
                <Select
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                >
                  {props.depart.map((elt) => (
                    <MenuItem value={elt}>{elt}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>Select a Depart</FormHelperText>
              </FormControl>

              <FormControl className={classes.formControl} color="secondary">
                <InputLabel style={{color:"black"}}>By Destination</InputLabel>
                <Select
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                >
                  {props.destination.map((elt) => (
                    <MenuItem value={elt}>{elt}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>Select a Destination</FormHelperText>
              </FormControl>

              <FormControl className={classes.formControl} color="secondary">
                <InputLabel style={{color:"black"}}>By Date</InputLabel>
                <Select
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                >
                  {props.date.map((elt) => (
                    <MenuItem value={elt}>{elt}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>Select a Date</FormHelperText>
              </FormControl>
              <center>
                <Input type="submit" value="Search" color="secondary" style={{color:"green"}}/>
              </center>
            </form>
          </div>
        </div>
      </div>
      {/* <h4 style={{ color: "white",fontSize:"40px", fontWeight:"bold" }}>Resultat of Search</h4> */}
      <h2 class="ui icon header" style={{color:"#D9534F"}}>   <i aria-hidden="true" class="search icon" ></i>   Search Result   </h2>
      <div className="container">
        <div className="card border-0 shadow my-5"
        style={{ backgroundColor: "#ffffffa1" }}>
          <div className="card-body p-5">
            <div className="row" style={{ justifyContent: "space-around" }}>
              {props.events.map((event) => (
                <CardEvent key={event._id} event={event} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </center>
  );
};
const mapStateToProps = (state) => ({
  events: state.events.events,
  organisator: state.organisator.organisator,
  destination: state.destination.destination,
  depart: state.depart.depart,
  date: state.date.date,
});

export default connect(mapStateToProps, {
  filterEvents,
  getEventsOrganisators,
  getEventsDestinations,
  getEventsDeparts,
  getEventsDates,
})(Search);

