import React from "react";
import { connect } from "react-redux";
import { fetchLandlords, filterLandlords } from "../store/landlords";
import { Link } from "react-router-dom";
import "materialize-css";
import { Select, Col, CardPanel } from "react-materialize";

const orderBy = (order, landlords) => {
  if (order === "grade") {
    return landlords.sort((a, b) =>
      a.avgs.avgGrade < b.avgs.avgGrade ? -1 : 1
    );
  }
  if (order === "kindness") {
    return landlords.sort((a, b) =>
      a.avgs.avgKindness > b.avgs.avgKindness ? -1 : 1
    );
  }
  if (order === "maintenance") {
    return landlords.sort((a, b) =>
      a.avgs.avgMaintenance > b.avgs.avgMaintenance ? -1 : 1
    );
  }
  if (order === "responsiveness") {
    return landlords.sort((a, b) =>
      a.avgs.avgResponsiveness > b.avgs.avgResponsiveness ? -1 : 1
    );
  }
  if (order === "pest-control") {
    return landlords.sort((a, b) =>
      a.avgs.avgPestControl > b.avgs.avgPestControl ? -1 : 1
    );
  }
  if (order === "most-reviews") {
    return landlords.sort((a, b) =>
      a.reviews.length > b.reviews.length ? -1 : 1
    );
  }
  if (order === "least-reviews") {
    return landlords.sort((a, b) =>
      a.reviews.length < b.reviews.length ? -1 : 1
    );
  }
};

class AllLandlords extends React.Component {
  constructor() {
    super();
    this.state = {
      order: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOrderChange = this.handleOrderChange.bind(this);
  }
  componentDidMount() {
    this.props.getLandlords();
  }

  handleChange = (e) => {
    this.props.filter(e.target.value);
  };

  handleOrderChange = (e) => {
    this.setState({ order: e.target.value });
  };

  render() {
    let landlords = this.props.landlords || [];
    if (this.state.order.length > 0) {
      console.log("state length:", this.state.order);
      landlords = orderBy(this.state.order, landlords);
    }

    console.log("landlords", landlords);

    return (
      <div>
        <h3>Landlords</h3>

        <div id="order-filter">
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
            <option value="all">See all</option>
            <option value="1">A</option>
            <option value="2">B</option>
            <option value="3">C</option>
            <option value="4">D</option>
            <option value="5">F</option>
          </Select>
          <Select
            id="Select-9"
            multiple={false}
            onChange={this.handleOrderChange}
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
              Order By
            </option>
            <option value="grade">Grade</option>
            <option value="kindness">Kindness</option>
            <option value="maintenance">Maintenance</option>
            <option value="responsiveness">Responsiveness</option>
            <option value="pest-control">Pest Control</option>
            <option value="most-reviews">Most Reviews</option>
            <option value="least-reviews">Least Reviews</option>
          </Select>
        </div>
        {landlords.length === 0 && (
          <div>Sorry, no landlords with that grade.</div>
        )}

        <div className=" rowcontainer">
          <div className="row">
            {landlords.map((landlord) => (
              <Col key={landlord.id} m={4} s={12}>
                <CardPanel className="blue-grey lighten-4">
                  <h5>
                    <Link to={`/landlords/${landlord.id}`}>
                      {landlord.name}
                    </Link>
                  </h5>
                  <div className="landlords-grade-recommend">
                    <span className="landlords-grade">
                      {landlord.avgs.avgGrade}
                    </span>{" "}
                    {landlord.avgs.avgWouldRecommend.true >
                    landlord.avgs.avgWouldRecommend.false ? (
                      <span className="landlords-recommend">Recommended</span>
                    ) : (
                      <span className="landlords-recommend">
                        NOT Recommended
                      </span>
                    )}
                  </div>
                  <div className="landlords-rating-category">
                    <span className="rating-name">Kindness: </span>
                    <span className="rating-value">
                      {landlord.avgs.avgKindness.toFixed(1)}
                    </span>
                    /5
                  </div>
                  <div className="landlords-rating-category">
                    <span className="rating-name">Maintenance: </span>
                    <span className="rating-value">
                      {landlord.avgs.avgMaintenance.toFixed(1)}
                    </span>
                    /5
                  </div>
                  <div className="landlords-rating-category">
                    <span className="rating-name">Responsiveness: </span>
                    <span className="rating-value">
                      {landlord.avgs.avgResponsiveness.toFixed(1)}
                    </span>
                    /5
                  </div>
                  <div className="landlords-rating-category">
                    <span className="rating-name">Pest Control: </span>
                    <span className="rating-value">
                      {landlord.avgs.avgPestControl.toFixed(1)}
                    </span>
                    /5
                  </div>
                  <div className="landlords-num-reviews">{`(${landlord.reviews.length} Reviews)`}</div>
                </CardPanel>
              </Col>
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
