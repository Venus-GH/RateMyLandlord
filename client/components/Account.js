import React from "react";
import { Tabs, Tab, Table, TextInput, Select } from "react-materialize";
import { connect } from "react-redux";
import { getReviews, updatePreferredName } from "../store/user";
import { setReviews } from "../store/reviewList";
import ReviewList from "./ReviewList";
import FeaturedListings from "./FeaturedListings";
import { updatePreferences } from "../store/user";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preferredName: "",
      nameEdit: false,
      preferenceEdit: false,
      neighborhood: "",
      maxPrice: "",
    };
    this.handleNameSubmit = this.handleNameSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.triggerEdit = this.triggerEdit.bind(this);
    this.handleSubmitPreferences = this.handleSubmitPreferences.bind(this);
  }

  async componentDidMount() {
    await this.props.getReviews(this.props.user.id);
    await this.props.setReviews(this.props.user.reviews);
    this.setState({ preferredName: this.props.user.preferredName });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleNameSubmit(boolean) {
    return (event) => {
      event.preventDefault();
      if (boolean === true) this.setState({ nameEdit: true });
      else {
        this.setState({ nameEdit: false });
        this.props.updatePreferredName(
          this.props.user.id,
          this.state.preferredName
        );
      }
    };
  }

  handleSubmitPreferences() {
    const { neighborhood, maxPrice } = this.state;
    const { updatePreferencesOnAccount, user } = this.props;
    const preferences = {
      neighborhood,
      maxPrice,
    };
    updatePreferencesOnAccount(user.id, preferences);
    this.setState({ preferenceEdit: false });
  }

  triggerEdit() {
    this.setState({ preferenceEdit: true });
  }

  render() {
    console.log("in render", this.state);
    const { user } = this.props;
    return (
      <div>
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
                    {this.state.nameEdit ? (
                      <td>
                        <TextInput
                          name="preferredName"
                          onChange={this.handleChange}
                          value={this.state.preferredName}
                        />
                      </td>
                    ) : (
                      <td>{this.state.preferredName}</td>
                    )}

                    {this.state.nameEdit ? (
                      <td>
                        <a
                          className="btn-floating btn-small waves-effect waves-light green"
                          onClick={this.handleNameSubmit(false)}
                        >
                          <i className="material-icons">done</i>
                        </a>
                      </td>
                    ) : (
                      <td>
                        <i
                          className="material-icons"
                          onClick={this.handleNameSubmit(true)}
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
                  <tr>
                    <td>Preferences</td>
                    {this.state.preferenceEdit ? (
                      <td className="input-field">
                        Interested in apartments in
                        <Select
                          name="neighborhood"
                          if="Select-9"
                          onChange={this.handleChange}
                        >
                          {/* <option disabled value="">
                              New York City
                          </option> */}
                          <option value="Manhattan">Manhattan</option>
                          <option value="Brooklyn">Brooklyn</option>
                          <option value="Queens">Queens</option>
                          <option value="Bronx">Bronx</option>
                          <option value="Staten-Island">Staten Island</option>
                        </Select>
                        for under
                        <Select name="maxPrice" onChange={this.handleChange}>
                          <option disabled value="">
                            $4,000
                          </option>
                          <option value="1000">$1,000</option>
                          <option value="1500">$1,500</option>
                          <option value="2000">$2,000</option>
                          <option value="2500">$2,500</option>
                          <option value="3000">$3,000</option>
                          <option value="3,500">$3,500</option>
                          <option value="4000">$4,000</option>
                        </Select>
                        .
                      </td>
                    ) : (
                      <td>
                        Interested in apartments in{" "}
                        {user.neighborhoodPreference
                          ? user.neighborhoodPreference + " "
                          : "New York City "}
                        for under{" "}
                        {user.maxPricePreference
                          ? user.maxPricePreference
                          : "$4,000"}
                        .
                      </td>
                    )}
                    {this.state.preferenceEdit ? (
                      <td>
                        <a
                          className="btn-floating btn-small waves-effect waves-light green"
                          onClick={this.handleSubmitPreferences}
                        >
                          <i className="material-icons">done</i>
                        </a>
                      </td>
                    ) : (
                      <td>
                        <i
                          className="material-icons"
                          onClick={this.triggerEdit}
                        >
                          edit
                        </i>
                      </td>
                    )}
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
            {/* <Tab
              options={{
                duration: 300,
                onShow: null,
                responsiveThreshold: Infinity,
                swipeable: false,
              }}
              title="Saved Items"
            ></Tab> */}
          </Tabs>
        </div>
        <FeaturedListings />
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
  updatePreferredName: (id, name) => dispatch(updatePreferredName(id, name)),
  updatePreferencesOnAccount: (id, preferences) =>
    dispatch(updatePreferences(id, preferences)),
});

export default connect(mapState, mapDispatch)(Account);
