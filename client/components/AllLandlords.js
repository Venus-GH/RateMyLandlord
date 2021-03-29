import React from "react";
import { connect } from "react-redux";
import { fetchLandlords, filterLandlords } from "../store/landlords";
import { Link } from "react-router-dom";
import "materialize-css";
import M from "materialize-css";
import { Select, Col, CardPanel } from "react-materialize";
import { filter } from "compression";

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

  handleChange = async (e) => {
    await this.setState({ filters: [e.target.value] });
    this.props.filter(this.state.order, this.state.filters);
  };

  handleFilterChange = async (e) => {
    const instance = M.FormSelect.getInstance(e.target);
    const selectedValues = instance.getSelectedValues();
    console.log(selectedValues);
    const filters =
      selectedValues.length > 1 ? selectedValues.join(",") : selectedValues[0];
    const selected = document.querySelectorAll(".optgroup-option.selected");
    console.log("current order:", this.state.order);
    const values = Array.from(selected).map((node) => node.innerText);
    console.log("selected values:", values);
    // this.props.filter(this.state.order, values);
    // await this.setState({ filters: filters });
    // console.log("filters selected:", this.state.filters);
  };

  handleOrderChange = async (e) => {
    await this.setState({ order: [e.target.value] });
    this.props.filter(this.state.order, this.state.filters);
  };

  render() {
    let landlords = this.props.landlords || [];
    const options = [
      { id: 1, value: "A", label: "A" },
      { id: 2, value: "B", label: "B" },
      { id: 3, value: "C", label: "C" },
      { id: 4, value: "D", label: "D" },
      { id: 5, value: "F", label: "F" },
      { id: 6, value: "true", label: "true" },
      { id: 7, value: "false", label: "false" },
    ];

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
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="F">F</option>
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
          {/* <Select
            id="Select-9 landlords-filter"
            onChange={this.handleFilterChange}
            multiple
            options={{
              classes: "",
              dropdownOptions: {
                alignment: "left",
                autoTrigger: true,
                closeOnClick: false,
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
          </Select> */}
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
    filter: (order, filters) => dispatch(filterLandlords(order, filters)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllLandlords);
