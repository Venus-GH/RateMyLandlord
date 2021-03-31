/* eslint-disable complexity */
import React from "react";
import { connect } from "react-redux";

import PestReview from "./PestReview";
import KindnessReview from "./KindnessReview";
import ResponsivenessReview from "./ResponsivenessReview";
import MaintenanceReview from "./MaintenanceReview";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { addReview } from "../../store/reviews";

import {
  Button,
  TextInput,
  Chip,
  Icon,
  Select,
  Checkbox,
} from "react-materialize";
import buildings from "../../store/buildings";
let chipsData = [];
let data = [];

const defaultState = {
  bedrooms: "",
  wouldRecommend: "",
  grade: "",
  rent: "",
  startDate: "",
  leaseLength: "",
  tags: [],
  comments: "",
  submitted: true,
  allowContact: false,
  landlordName: "",
  address: "",
  autocomplete: false,
  noMatch: false,
};

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bedrooms: null,
      wouldRecommend: null,
      grade: null,
      rent: null,
      startDate: null,
      leaseLength: null,
      tags: [],
      comments: null,
      submitted: false,
      allowContact: false,
      landlordName: null,
      address: null,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChipAdd = this.onChipAdd.bind(this);
    this.onChipDelete = this.onChipDelete.bind(this);
    this.onYes = this.onYes.bind(this);
    this.onNo = this.onNo.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.handleProperty = this.handleProperty.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.onPlaceChanged = this.onPlaceChanged.bind(this);
    this.autocomplete = null;
  }
  componentDidMount() {
    // console.log("this.state in review form", this.state);
    // this.props.getLandlords();
    this.setState({ address: this.props.address });
    this.setState({ latitude: this.props.latitude });
    this.setState({ longitude: this.props.longitude });
  }
  onChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  onLoad(autocomplete) {
    // console.log("in onload");
    this.autocomplete = autocomplete;
  }

  onPlaceChanged() {
    if (this.autocomplete !== null) {
      const place = this.autocomplete.getPlace();
      this.setState({
        latitude: place.geometry.location.lat(),
        longitutude: place.geometry.location.lng(),
        address: place.formatted_address,
      });
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  }

  async onSubmit() {
    await this.setState({ tags: data });
    let newerReview = "";

    {
      this.props.landlord.id
        ? (newerReview = {
            ...this.props.reviews,
            ...this.state,
            landlordName: this.props.landlord.name,
            userId: this.props.user.id,
          })
        : (newerReview = {
            ...this.props.reviews,
            ...this.state,
            userId: this.props.user.id,
          });
    }

    this.props.addReview(newerReview);
    this.setState(defaultState);
  }
  onYes() {
    this.setState({
      wouldRecommend: true,
    });
  }
  onNo() {
    this.setState({
      wouldRecommend: false,
    });
  }
  onCheck() {
    this.setState({ allowContact: !this.state.allowContact });
  }
  onChipAdd(chips) {
    chips[0].M_Chips.chipsData.map((tag) => {
      data.push(tag.tag);
    });
    chipsData.push(chips[0].M_Chips.chipsData);
  }
  onChipDelete() {
    console.log("deleted");
  }
  handleChange = (e) => {
    this.setState({ grade: e.target.value });
  };
  handleProperty = (e) => {
    if (e.target.value === "autocomplete") {
      this.setState({ autocomplete: true });
    } else {
      this.setState({ address: e.target.value });
    }
  };
  handleLandlord = (e) => {
    if (e.target.value === "noMatch") {
      this.setState({ noMatch: true });
    } else {
      this.setState({ landlordName: e.target.value });
    }
  };
  render() {
    let landlord = this.props.landlord || {};
    let landlordBuildings = landlord.buildings || [];
    let landlords = this.props.landlords || [];
    console.log("this.props in review home", this.props);

    const isEnabled = () => {
      // console.log("!this.props.address", !this.props.address);
      // console.log("this.state", this.state);
      if (!this.props.address) {
        if (
          Object.keys(this.props.reviews).length > 3 &&
          this.state.grade !== "" &&
          this.state.address !== undefined &&
          this.state.wouldRecommend !== null
        ) {
          return true;
        } else return false;
      }
      if (this.props.address) {
        if (
          Object.keys(this.props.reviews).length > 3 &&
          this.state.grade !== "" &&
          this.state.wouldRecommend !== null
        ) {
          return true;
        } else return false;
      }
    };
    return (
      <div id="reviewForm">
        {!landlord.name && (
          <div>
            <Select
              id="Select-9"
              multiple={false}
              onChange={this.handleLandlord}
              options={{
                classes: "",
                dropdownOptions: {
                  alignment: "left",
                  autoTrigger: true,
                  closeOnClick: true,
                  constrainWidth: true,
                  coverTrigger: true,
                  hover: false,
                  inDuration: 150,
                  onCloseEnd: null,
                  onCloseStart: null,
                  onOpenEnd: null,
                  onOpenStart: null,
                  outDuration: 250,
                },
              }}
              value=""
            >
              <option disabled value="">
                Which landlord?
              </option>

              {landlords.map((ldlrd) => {
                return (
                  <option key={ldlrd.id} value={ldlrd.name}>
                    {ldlrd.name}
                  </option>
                );
              })}
              <option value="noMatch"> I don't see my landlord here</option>
            </Select>
          </div>
        )}
        {this.state.noMatch && (
          <TextInput
            id="landlordName"
            placeholder="ex: Smith Brother Properties"
            onChange={this.onChange}
            value={this.state.landlordName}
          />
        )}
        {!this.props.address && (
          <div>
            <Select
              id="Select-9"
              multiple={false}
              onChange={this.handleProperty}
              options={{
                classes: "",
                dropdownOptions: {
                  alignment: "left",
                  autoTrigger: true,
                  closeOnClick: true,
                  constrainWidth: true,
                  coverTrigger: true,
                  hover: false,
                  inDuration: 150,
                  onCloseEnd: null,
                  onCloseStart: null,
                  onOpenEnd: null,
                  onOpenStart: null,
                  outDuration: 250,
                },
              }}
              value=""
            >
              <option disabled value="">
                Which property?
              </option>

              {landlordBuildings.length > 0 ? (
                landlordBuildings.map((building) => {
                  return (
                    <option key={building.id} value={building.address}>
                      {building.address}
                    </option>
                  );
                })
              ) : (
                <option>Whoops, no properties here.</option>
              )}
              <option value="autocomplete">
                {" "}
                I don't see my building here
              </option>
            </Select>
          </div>
        )}
        {/* <LoadScript
          googleMapsApiKey="AIzaSyCOopGii1dRKKnMTLI00ilvrrKW64KKLfk"
          libraries={["places"]}
        > */}
        {this.state.autocomplete && (
          <Autocomplete
            onLoad={this.onLoad}
            onPlaceChanged={this.onPlaceChanged}
          >
            <input placeholder="Find address by building" />
          </Autocomplete>

          // </div>
        )}
        {/* </LoadScript> */}

        <div id="selectDiv">
          <Select
            id="Select-9"
            multiple={false}
            onChange={this.handleChange}
            options={{
              classes: "",
              dropdownOptions: {
                alignment: "left",
                autoTrigger: true,
                closeOnClick: true,
                constrainWidth: true,
                coverTrigger: true,
                hover: false,
                inDuration: 150,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                outDuration: 250,
              },
            }}
            value=""
          >
            <option disabled value="">
              Overall Grade?
            </option>
            <option value="5">A</option>
            <option value="4">B</option>
            <option value="3">C</option>
            <option value="2">D</option>
            <option value="1">F</option>
          </Select>
        </div>
        <PestReview />
        <KindnessReview />
        <ResponsivenessReview />
        <MaintenanceReview />
        <p>How many bedrooms?</p>
        <TextInput
          id="bedrooms"
          placeholder="ex: 2"
          onChange={this.onChange}
          value={this.state.bedrooms}
        />
        <p>How much was rent?</p>
        <TextInput
          id="rent"
          placeholder="ex: 1500"
          onChange={this.onChange}
          value={this.state.rent}
        />
        <p>When did you move in?</p>
        <TextInput
          id="startDate"
          placeholder="ex: 01/01/2021"
          onChange={this.onChange}
          value={this.state.startDate}
        />
        <p>How long was your lease length in months?</p>
        <TextInput
          id="leaseLength"
          placeholder="ex: 12"
          onChange={this.onChange}
          value={this.state.leaseLength}
        />
        <p>Would you recommend this landlord to a friend? *Required</p>
        <div>
          <Button onClick={this.onYes}>Yes</Button>
          <Button onClick={this.onNo}>No</Button>
        </div>
        <p>Any additional comments?</p>
        <TextInput
          id="comments"
          placeholder="ex: Wonderful landlord. Sad to move."
          onChange={this.onChange}
          value={this.state.comments}
        />

        <Checkbox
          // checked
          id="Checkbox_3"
          label="Allow others to contact you?"
          onChange={this.onCheck}
          value={this.state.allowContact}
        />
        <Chip
          close={false}
          closeIcon={<Icon className="close">close</Icon>}
          options={{
            autocompleteOptions: {
              data: {
                responsive: null,
                slumlord: null,
                kind: null,
                mean: null,
                communicative: null,
                rude: null,
                fair: null,
              },
            },
            onChipAdd: this.onChipAdd,
            onChipDelete: this.onChipDelete,

            placeholder: "Enter a tag",
            secondaryPlaceholder: "+Tag",
          }}
        />
        <Button
          disabled={!isEnabled()}
          onClick={this.onSubmit}
          node="button"
          style={{
            marginRight: "5px",
          }}
          waves="light"
        >
          Submit Review
        </Button>
        {this.state.submitted && <p>Form submitted</p>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reviews: state.reviews,
    user: state.user,
    landlords: state.allLandlords,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addReview: (review) => dispatch(addReview(review)),
    // getLandlords: () => dispatch(fetchLandlords()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
