import React from "react";
import { connect } from "react-redux";
import CardShopping from "../CardsModel/CardShopping";
import GoToHome from "../BackToHome.js/GoToHome";
import { getEvents } from "../../Redux/actions/actionEvent";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import { Loader } from "semantic-ui-react";
class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    this.props.getEvents();
    setTimeout(() => {
      this.setState({ loading: false });
    },500);
  }
  render(props) {
    const userID = this.props.match.params.id;
    if (this.state.loading) {
      // window.location.reload(true);
      return <Loader loading={true} />;
    }
    return (
      <div>
        <GoToHome />
        <div className="container" style={{ marginTop: "5%" }}>
          <div className="card border-0 shadow my-5">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-md-offset-1">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Event</th>
                      <th>Date</th>
                      <th>Pl.Disponible</th>
                      <th>Pl.reserved</th>
                      <th className="text-center">Price</th>
                      <th className="text-center">Total</th>
                      <th> </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.events.map((event) =>
                      event.participant.map(
                        (elt, index) =>
                          elt._id === userID && (
                            <CardShopping key={index} event={event} />
                          )
                      )
                    )}
                    {/* <tr>
                      <td>   </td>
                      <td>   </td>
                      <td>   </td>
                      <td>   </td>
                      <td>
                        <h3>Total</h3>
                      </td>
                      <td class="text-right">
                        <h3>
                          <strong>{} DT</strong>
                        </h3>
                      </td>
                    </tr>
                    <tr>
                      <td>   </td>
                      <td>   </td>
                      <td>   </td>
                      <td>   </td>
                      <td></td>
                      <Button
                        variant="contained"
                        // className={classes.button}
                        endIcon={<Icon>send</Icon>}
                        // onClick={() => history.push("/checkout")}
                      >
                        checkout
                      </Button>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  events: state.events.events,
});
export default connect(mapStateToProps, { getEvents })(ShoppingCart);