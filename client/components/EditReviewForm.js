/* eslint-disable complexity */

import React from "react";
import { connect } from "react-redux";

import PestReview from "./Reviews/PestReview";
import KindnessReview from "./Reviews/KindnessReview";
import ResponsivenessReview from "./Reviews/ResponsivenessReview";
import MaintenanceReview from "./Reviews/MaintenanceReview";
import { editReview } from "../store/reviewList";

import {
  Button,
  TextInput,
  Chip,
  Icon,
  Select,
  Checkbox,
} from "react-materialize";
let chipsData = [];
let data = [];

class EditReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bedrooms: "",
      wouldRecommend: null,
      grade: null,
      rent: "",
      startDate: "",
      leaseLength: "",
      tags: [],
      comments: "",
      submitted: false,
      allowContact: false,
      kindness: 0,
      pestControl: 0,
      maintenance: 0,
      responsiveness: 0,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChipAdd = this.onChipAdd.bind(this);
    this.onYes = this.onYes.bind(this);
    this.onNo = this.onNo.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.autocomplete = null;
  }
  async componentDidMount() {
    // console.log("this.state in review form", this.state);
    // this.props.getLandlords();
    const grade = { 1: "F", 2: "D", 3: "C", 4: "B", 5: "A" };
    const { review } = this.props;
    await this.setState({
      grade: grade[review.grade],
      kindness: review.kindness,
      pestControl: review.pestControl,
      maintenance: review.maintenance,
      responsiveness: review.responsiveness,
      bedrooms: review.bedrooms,
      wouldRecommend: review.wouldRecommend,
      rent: review.rent,
      startDate: review.startDate,
      leaseLength: review.leaseLength,
      tags: review.tags,
      comments: review.comments,
      allowContact: review.comments,
    });
  }

  onChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  async onSubmit() {
    await this.setState({ tags: data });
    let newerReview = {};

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

    this.props.editReview(newerReview);
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

  handleChange = (e) => {
    this.setState({ grade: e.target.value });
  };

  render() {
    const { landlord, address, review } = this.props;
    // console.log("review in edit review form", review);
    // console.log("state in edit review form", this.state);

    const isEnabled = () => {
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
      <div id="edit-review-form">
        <div>Landlord: {landlord}</div>
        <div>Address: {address}</div>

        <div id="selectDiv">
          <p>Grade?</p>
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
            value={this.state.grade}
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
        <p>Would you recommend this landlord to a friend? </p>
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
    editReview: (review) => dispatch(editReview(review)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditReviewForm);
