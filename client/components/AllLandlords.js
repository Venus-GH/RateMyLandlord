import React from "react";
import { connect } from "react-redux";
import { fetchLandlords, filterLandlords } from "../store/landlords";
import { Link } from "react-router-dom";
import "materialize-css";
import { Col, CardPanel } from "react-materialize";
import { Multiselect } from "multiselect-react-dropdown";

class AllLandlords extends React.Component {
  constructor() {
    super();
    this.state = {
      order: "",
      filters: [],
      orderArray: [
        { label: "Grade", key: "grade" },
        { label: "Kindness", key: "kindness" },
        { label: "Maintenance", key: "maintenance" },
        { label: "Responsiveness", key: "responsiveness" },
        { label: "Pest Control", key: "pest-control" },
        { label: "Most Reviews", key: "most-reviews" },
        { label: "Least Reviews", key: "least-reviews" },
      ],
      filterArray: [
        { label: "A", cat: "Grade", key: "A" },
        { label: "B", cat: "Grade", key: "B" },
        { label: "C", cat: "Grade", key: "C" },
        { label: "D", cat: "Grade", key: "D" },
        { label: "F", cat: "Grade", key: "F" },
        { label: "Recommended", cat: "Would Recommend", key: "true" },
        { label: "Not Recommended", cat: "Would Recommend", key: "false" },
      ],
    };
    this.handleFilterSelect = this.handleFilterSelect.bind(this);
    this.handleOrderSelect = this.handleOrderSelect.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  async componentDidMount() {
    await this.props.getLandlords();
  }

  async handleOrderSelect(selectedList, selectedItem) {
    await this.setState({ order: selectedItem.key });
    this.props.filter(this.state.order, this.state.filters);
  }

  async handleFilterSelect(selectedList, selectedItem) {
    await this.setState({ filters: selectedList.map((filter) => filter.key) });
    this.props.filter(this.state.order, this.state.filters);
  }

  async handleRemove(selectedList, removedItem) {
    await this.setState({ filters: selectedList.map((filter) => filter.key) });
    this.props.filter(this.state.order, this.state.filters);
  }

  render() {
    let landlords = this.props.landlords || [];

    return (
      <div>
        <h3>Landlords</h3>

        <div id="order-filter">
          <Multiselect
            id="1"
            options={this.state.orderArray}
            singleSelect
            displayValue="label"
            onSelect={this.handleOrderSelect}
            placeholder="Sort"
            style={{
              searchBox: {
                border: "none",
                borderRadius: "0px",
              },
            }}
          />
          <Multiselect
            id="2"
            options={this.state.filterArray}
            groupBy="cat"
            displayValue="label"
            showCheckbox={true}
            onSelect={this.handleFilterSelect}
            onRemove={this.handleRemove}
            closeOnSelect={false}
            placeholder="Filter"
            closeIcon="cancel"
            style={{
              searchBox: {
                border: "none",
                borderRadius: "0px",
              },
            }}
          />
        </div>
        {landlords.length === 0 && <div>Sorry, no landlords found.</div>}

        <div className=" rowcontainer">
          <div className="row">
            {landlords.map((landlord) => (
              <Col key={landlord.id} m={4} s={12}>
                <CardPanel className="blue-grey lighten-4">
                  <h5 className="all-landlords-name">
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
                    {landlord.avgs.avgWouldRecommend.true >=
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
                      {landlord.avgs.avgKindness}
                    </span>
                    /5
                  </div>
                  <div className="landlords-rating-category">
                    <span className="rating-name">Maintenance: </span>
                    <span className="rating-value">
                      {landlord.avgs.avgMaintenance}
                    </span>
                    /5
                  </div>
                  <div className="landlords-rating-category">
                    <span className="rating-name">Responsiveness: </span>
                    <span className="rating-value">
                      {landlord.avgs.avgResponsiveness}
                    </span>
                    /5
                  </div>
                  <div className="landlords-rating-category">
                    <span className="rating-name">Pest Control: </span>
                    <span className="rating-value">
                      {landlord.avgs.avgPestControl}
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
