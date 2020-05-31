import React from "react";
import { BrowserRouter} from "react-router-dom";
import { connect } from "react-redux";

import { getEvents } from "./Redux/actions/actionEvent";
import MainPage from "./Components/MainPage/MainPage";
import Loader from "./Components/Loader/Loader";
// import { Loader } from "./Components/Loader/Loader";


class App extends React.Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.props.getEvents();
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  }

  render() {
    if (this.state.loading) {
      return <Loader loading={true} />;
    }
    return (
      <div>
        <BrowserRouter>
          <MainPage/>
        </BrowserRouter>
      </div>
    );
  }
}
export default connect(null, { getEvents })(App);
