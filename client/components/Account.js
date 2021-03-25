import React from "react";
import { Tabs, Tab, Table, TextInput } from "react-materialize";
import { connect } from "react-redux";
import { getReviews } from "../store/user";
import { setReviews } from "../store/reviewList";
import ReviewList from "./ReviewList";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      edit: false,
    };
    this.changeName = this.changeName.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    console.log("component did mount");
    await this.props.getReviews(this.props.user.id);
    await this.props.setReviews(this.props.user.reviews);
    this.setState({ name: this.props.user.preferredName });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  changeName(boolean) {
    if (boolean === true) this.setState({ edit: true });
    else this.setState({ edit: false });
    // on close, set prefererd name to input value
  }

  render() {
    const { user } = this.props;
    return (
      <div id="account-container">
        <Tabs className="tab-demo z-depth-1" id="account-tabs">
          <Tab
            options={{
              duration: 300,
              onShow: null,
              responsiveThreshold: Infinity,
              swipeable: false,
            }}
            title="Profile"
          >
            <Table>
              <tbody>
                <tr className="hoverable">
                  <td>Preferred Name</td>
                  {this.state.edit ? (
                    <td>
                      <TextInput
                        onChange={this.handleChange}
                        value={this.state.name}
                      />
                    </td>
                  ) : (
                    <td>{user.preferredName}</td>
                  )}

                  {this.state.edit ? (
                    <td>
                      <i
                        className="material-icons"
                        onClick={() => this.changeName(false)}
                      >
                        close
                      </i>
                    </td>
                  ) : (
                    <td>
                      <i
                        className="material-icons"
                        onClick={() => this.changeName(true)}
                      >
                        edit
                      </i>
                    </td>
                  )}
                </tr>
                <tr>
                  <td>email</td>
                  <td>{user.email}</td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </Tab>
          <Tab
            options={{
              duration: 300,
              onShow: null,
              responsiveThreshold: Infinity,
              swipeable: false,
            }}
            title="Your Reviews"
          >
            <div>
              {user.reviews ? (
                <div>
                  <h6>{user.reviews.length} Reviews</h6>
                  <ReviewList type="user-review-list" />
                </div>
              ) : (
                "No Reviews Yet"
              )}
            </div>
          </Tab>
          <Tab
            options={{
              duration: 300,
              onShow: null,
              responsiveThreshold: Infinity,
              swipeable: false,
            }}
            title="Saved Items"
          ></Tab>
        </Tabs>
      </div>
    );
  }
}

const mapState = (state) => ({
  user: state.user,
});

const mapDispatch = (dispatch) => ({
  getReviews: (userId) => dispatch(getReviews(userId)),
  setReviews: (reviews) => dispatch(setReviews(reviews)),
});

export default connect(mapState, mapDispatch)(Account);
