import React from "react";
import { connect } from "react-redux";

import PestReview from "./PestReview";
import KindnessReview from "./KindnessReview";
import ResponsivenessReview from "./ResponsivenessReview";
import MaintenanceReview from "./MaintenanceReview";

import { addReview } from "../../store/reviews";

import { Button, TextInput, Chip, Icon, Select } from "react-materialize";
let chipsData = [];
let data = [];

class ReviewForm extends React.Component {
  constructor() {
    super();
    this.state = {
      bedrooms: "",
      wouldRecommend: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChipAdd = this.onChipAdd.bind(this);
    this.onChipDelete = this.onChipDelete.bind(this);
    this.onYes = this.onYes.bind(this);
    this.onNo = this.onNo.bind(this);
  }
  componentDidMount() {
    console.log("this.state in review form", this.state);
  }
  onChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
    console.log("this.state", this.state);
  }
  async onSubmit() {
    console.log("this.props", this.props);

    await this.setState({ tags: data });
    let newReview = {
      ...this.props.reviews,
      landlordName: "hello",
      grade: 5,
      bedrooms: 2,
      rent: 1500,
      leaseLength: 12,
    };
    let newerReview = {
      ...this.props.reviews,
      ...this.state,
      landlordName: "test",

      address: "address",
    };
    this.props.addReview(newerReview);
    console.log("this.state", this.state);
    // this.props.addReview(this.props.reviews)
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
  onChipAdd(chips) {
    console.log("add");
    // console.log("event", event);
    // console.log("value", value);
    // this.setState({
    //   tags: chips[0].M_Chips.chipsData,
    // });

    chips[0].M_Chips.chipsData.map((tag) => {
      data.push(tag.tag);
    });
    console.log("data", data);
    chipsData.push(chips[0].M_Chips.chipsData);
    // console.log("this.state", this.state);
    // var chip_data = $(".chips-initial").material_chip("data");
    // console.log("this.state", this.state);
    console.log("chipsData", chipsData);
    // console.log("chpidata", chip_data);
  }
  onChipDelete() {
    console.log("deleted");
  }
  handleChange = (e) => {
    this.setState({ grade: e.target.value });
  };
  render() {
    return (
      <div id="reviewForm">
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
            <option value="1">A</option>
            <option value="2">B</option>
            <option value="3">C</option>
            <option value="4">D</option>
            <option value="5">F</option>
          </Select>
        </div>
        <PestReview />
        <KindnessReview />
        <ResponsivenessReview />
        <MaintenanceReview />
        <p>How many bedrooms?</p>
        <TextInput id="bedrooms" placeholder="ex: 2" onChange={this.onChange} />
        <p>How much was rent?</p>
        <TextInput id="rent" placeholder="ex: 1500" onChange={this.onChange} />
        <p>When did you move in?</p>
        <TextInput
          id="startDate"
          placeholder="ex: 01/01/2021"
          onChange={this.onChange}
        />
        <p>How long was your lease length in months?</p>
        <TextInput
          id="leaseLength"
          placeholder="ex: 12"
          onChange={this.onChange}
        />
        <p>Would you recommend this landlord to a friend?</p>
        <div>
          <Button onClick={this.onYes}>Yes</Button>
          <Button onClick={this.onNo}>No</Button>
        </div>
        <p>Any additional comments?</p>
        <TextInput
          id="comments"
          placeholder="ex: Wonderful landlord. Sad to move."
          onChange={this.onChange}
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
          onClick={this.onSubmit}
          node="button"
          style={{
            marginRight: "5px",
          }}
          waves="light"
        >
          Submit Review
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reviews: state.reviews,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addReview: (review) => dispatch(addReview(review)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
