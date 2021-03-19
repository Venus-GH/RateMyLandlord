import React from "react";
import { connect } from "react-redux";
import { fetchLandlords, filterLandlords } from "../store/landlords";
import { Link } from "react-router-dom";
import "materialize-css";
import { Button, Dropdown, NavItem, Row, Input } from "react-materialize";
// import { Row, Input } from 'react-materialize'

class AllLandlords extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.props.getLandlords();
  }

  handleChange = e => {
    console.log("e.target.value", e.target.value);
    this.props.filter(e.target.value);
  };

  render() {
    const landlords = this.props.landlords || [];

    return (
      <div>
        {/* <div className="input-field col s12">
    <select>
      <option value="" disabled selected>Choose your option</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </select>
    <label>Materialize Select</label> */}
        {/* </div> */}
        {/* <Row>
          <Input 
          s={12}
           type='select' label="Materialize Select" defaultValue='2'>
            <option value='1'>Option 1</option>
            <option value='2'>Option 2</option>
            <option value='3'>Option 3</option>
          </Input>
        </Row>; */}
        <h3>Landlords</h3>
        {/* <Dropdown onSelect={this.handleChange} trigger={
          <Button>Drop me!</Button>
        }>
          <NavItem>one</NavItem>
          <NavItem>two</NavItem>
          <NavItem>three</NavItem>
        </Dropdown> */}

        {landlords.length > 0 &&
          landlords.map(landlord => (
            <div className="row" key={landlord.id}>
              <div className="col s12 m6">
                <div className="card blue-grey darken-1">
                  <div className="card-content white-text">
                    <span className="card-title">{landlord.name}</span>
                    <h2>Overall Rating: {landlord.avgRating}</h2>
                    <p>Number of reviews: {}</p>
                  </div>
                  <div className="card-action">
                    <Link to={`/landlords/${landlord}.id`}>Check them out</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    landlords: state.allLandlords
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLandlords: () => dispatch(fetchLandlords()),
    filter: filter => dispatch(filterLandlords(filter))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllLandlords);
