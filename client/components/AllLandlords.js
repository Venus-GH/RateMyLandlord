import React from "react";
import { connect } from "react-redux";
import { fetchLandlords, filterLandlords } from "../store/landlords";
import { Link } from "react-router-dom";
import "materialize-css";
import { Select } from "react-materialize";
// import { Row, Input } from 'react-materialize'
import ReviewHome from "./Reviews/ReviewHome";

class AllLandlords extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.props.getLandlords();
  }

  handleChange = (e) => {
    console.log("e.target.value", e.target.value);
    this.props.filter(e.target.value);
  };

  render() {
    let landlords = this.props.landlords || [];
    console.log("landlords", landlords);

    return (
      <div>
        <ReviewHome />

        <h3>Landlords</h3>

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
              Filter by Grade
            </option>
            <option value="1">A</option>
            <option value="2">B</option>
            <option value="3">C</option>
            <option value="4">D</option>
            <option value="5">F</option>
          </Select>
        </div>
        <div className=" rowcontainer">
          <div className="row">
            {landlords.map((landlord) => (
              <div className="col  s12 m4" key={landlord.id}>
                <div className="card medium blue-grey darken-1 ">
                  <div className="card-content white-text">
                    <span className="card-title">{landlord.name}</span>
                    <h4>Overall Rating: {landlord.avgs.avgGrade}</h4>

                    <p>Average Kindness Rating: {landlord.avgs.avgKindness}</p>
                    <p>
                      Average Maintenance Rating: {landlord.avgs.avgMaintenance}
                    </p>
                    <p>
                      Average Pest Control Rating:{" "}
                      {landlord.avgs.avgPestControl}
                    </p>
                    <p>
                      Would people recommend? Yes:{" "}
                      {landlord.avgs.avgWouldRecommend.true} No:{" "}
                      {landlord.avgs.avgWouldRecommend.false}
                    </p>
                    <p>Number of reviews: {landlord.reviews.length}</p>
                  </div>
                  <div className="card-action">
                    <Link to={`/landlords/${landlord.id}`}>Check them out</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    landlords: state.allLandlords,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLandlords: () => dispatch(fetchLandlords()),
    filter: (filter) => dispatch(filterLandlords(filter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllLandlords);
