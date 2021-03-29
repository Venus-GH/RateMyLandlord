import React from "react";
import { connect } from "react-redux";
import { fetchLandlords, filterLandlords } from "../store/landlords";
import { Link } from "react-router-dom";
import "materialize-css";
import M from "materialize-css";
import { Select, Col, CardPanel } from "react-materialize";

const rating = (num) => {
  return String(num).length > 1 ? num.toFixed(1) : num;
};

class AllLandlords extends React.Component {
  constructor() {
    super();
    this.state = {
      order: "",
      filters: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOrderChange = this.handleOrderChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  async componentDidMount() {
    await this.props.getLandlords();
    // this.setState({ landlords: this.props.landlords });
  }

  /*
  async componentDidUpdate(prevProps, prevState) {
    if (this.state.order !== prevState.order) {
      const ordered = await orderBy(this.state.order, this.state.landlords);
      this.setState({ landlords: ordered });
    }
    // if (
    //   JSON.stringify(this.state.filters) !== JSON.stringify(prevState.filters)
    // ) {

    // document.addEventListener("DOMContentLoaded", function () {
    //   const selects = document.querySelector("select");
    //   console.log("in eevent listener, selects:", selects);
    //   const instances = M.FormSelect.init(selects, {});
    //   console.log("in eevent listener, instances:", instances);
    //   const selectOption = document.querySelector("#option-select");
    //   console.log("in eevent listener, selectOption:", selectOption);

    //   selectOption.addEventListener("change", function () {
    //     const instance = M.FormSelect.getInstance(selectOption);
    //     console.log("in eevent listener, instance:", instance);
    //     const selectedValues = instance.getSelectedValues();
    //     console.log("selected vals in component did update", selectedValues);
    //   });
    // });
    // const filtered = await filterBy(this.state.filters, this.state.landlords);
    // this.setState({ landlords: filtered });
  }
  */

  handleChange = (e) => {
    this.props.filter(e.target.value);
  };

  handleFilterChange = async (e) => {
    const instance = M.FormSelect.getInstance(e.target);
    const selectedValues = instance.getSelectedValues();
    console.log(selectedValues);
    // const filtered = await filterBy(selectedValues, this.state.landlords);
    // console.log("filtered:", filtered);
    this.setState({ filters: selectedValues.join(",") });
    // console.log("filters selected:", this.state.filters);
  };

  handleOrderChange = (e) => {
    this.setState({ order: [e.target.value] });
    this.props.filter(this.state.order, this.state.filters);
    // this.props.filter(e.target.value, this.state.filters);
  };

  render() {
    let landlords = this.props.landlords || [];

    return (
      <div>
        <h3>Landlords</h3>

        <div id="order-filter">
          {/* <Select
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
          </Select> */}
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
              Sort By
            </option>
            <option value="grade">Grade</option>
            <option value="kindness">Kindness</option>
            <option value="maintenance">Maintenance</option>
            <option value="responsiveness">Responsiveness</option>
            <option value="pest-control">Pest Control</option>
            <option value="most-reviews">Most Reviews</option>
            <option value="least-reviews">Least Reviews</option>
          </Select>
          <Select
            id="Select-9 landlords-filter"
            onChange={this.handleFilterChange}
            multiple
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
            value={[""]}
          >
            <option disabled value="">
              Filter Results
            </option>
            <optgroup label="Grade">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="F">F</option>
            </optgroup>
            <optgroup label="Would Recommend">
              <option value="true">Recommended</option>
              <option value="false">Not Recommended</option>
            </optgroup>
          </Select>
        </div>
        {landlords.length === 0 && <div>Sorry, no landlords found.</div>}

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
                    {landlord.avgs.avgGrade === "A" && (
                      <span className="landlords-grade grade-a">
                        {landlord.avgs.avgGrade}
                      </span>
                    )}
                    {landlord.avgs.avgGrade === "B" && (
                      <span className="landlords-grade grade-b">
                        {landlord.avgs.avgGrade}
                      </span>
                    )}
                    {landlord.avgs.avgGrade === "C" && (
                      <span className="landlords-grade grade-c">
                        {landlord.avgs.avgGrade}
                      </span>
                    )}
                    {landlord.avgs.avgGrade === "D" && (
                      <span className="landlords-grade grade-d">
                        {landlord.avgs.avgGrade}
                      </span>
                    )}
                    {landlord.avgs.avgGrade === "F" && (
                      <span className="landlords-grade grade-f">
                        {landlord.avgs.avgGrade}
                      </span>
                    )}{" "}
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
                      {rating(landlord.avgs.avgKindness)}
                    </span>
                    /5
                  </div>
                  <div className="landlords-rating-category">
                    <span className="rating-name">Maintenance: </span>
                    <span className="rating-value">
                      {rating(landlord.avgs.avgMaintenance)}
                    </span>
                    /5
                  </div>
                  <div className="landlords-rating-category">
                    <span className="rating-name">Responsiveness: </span>
                    <span className="rating-value">
                      {rating(landlord.avgs.avgResponsiveness)}
                    </span>
                    /5
                  </div>
                  <div className="landlords-rating-category">
                    <span className="rating-name">Pest Control: </span>
                    <span className="rating-value">
                      {rating(landlord.avgs.avgPestControl)}
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
