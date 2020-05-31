import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import jwt_decode from "jwt-decode";

import { getEvents, filterEvents } from "../../Redux/actions/actionEvent";

import Home from "../Home/Home";
import Register from "../Authentification/Register";
import Login from "../Authentification/Login";
import Acceuil from "../Acceuil/Acceuil";
import Navbar from "../HeaderFooter/Navbar";
import Guider from "../Guiders/Guider";
import Footer from "../HeaderFooter/Footer";
import Event from "../Events/Event";
import Advice from "../Advices/Advice";
import Search from "../Search/search";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import Checkout from "../Checkout/Checkout";
import For0For from "../Redirection/For0For";
import Profile from "../Profile/profile";

import ListMyEvents from "../Participant/ListEvents"
import ListParticipants from "../Participant/ListParticipants";
import Carroussel from "../3D/3Dcarroussel";
import Carroussel2 from "../3D/carroussel 2/carroussel";


class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      filtredEvents: [],
    };
  }
  componentDidMount() {
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      /************************************************************************************/
      const filterEventsByOrganisator = async () => {
        await axios
          .get(`http://localhost:5000/events/findEvents/${decoded.userName}`)
          .then((resp) => this.setState({ filtredEvents: resp.data }));
      };
      filterEventsByOrganisator();
      /************************************************************************************/
      const getCurrentUser = async () => {
        await axios
          .get(`http://localhost:5000/users/${decoded.id}`)
          .then((resp) => this.setState({ currentUser: resp.data }));
      };
      getCurrentUser();
      /************************************************************************************/ 
    }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register">
            <Register />
            <Footer />
          </Route>
          <Route exact path="/login">
            <Login />
            <Footer />
          </Route>
          <Route exact path="/acceuil">
            <Navbar />
            <Acceuil />
          </Route>
          <Route exact path="/guiders">
            <Navbar />
            <Guider />
            <Footer />
          </Route>
          <Route exact path="/events/:id" component={Event} />
          <Route exact path="/advices">
            <Navbar />
            <Advice />
            <Footer />
          </Route>

          <Route exact path="/MyEvents">
              <Navbar/>
            <ListMyEvents /> 
          </Route>
          <Route exact path="/MyEvents/:Myid" component={ListParticipants}/>
              

          <Route exact path="/cart/:id" component={ShoppingCart} />
          <Route exact path="/filterEvents">
            <Navbar />
            <Search />
            <Footer />
          </Route>
          <Route
            exact
            path="/profile"
            render={(props) => (
              <div>
                <Navbar />
                <Profile props={this.state.currentUser} {...props} />
              </div>
            )}
          ></Route>
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/carroussel" component={Carroussel}/>
          <Route exact path="/carroussel2" component={Carroussel2}/>
          <Route component={For0For} />
        </Switch>
      </div>
    );
  }
}
export default connect(null, { getEvents, filterEvents })(MainPage);
