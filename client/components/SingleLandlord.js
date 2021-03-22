import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchSingleLandlord } from "../store/singleLandlord";
import { Link } from "react-router-dom";
import { TagCloud } from "react-tagcloud";
import ReviewList from "./ReviewList";
import BuildingByLandlord from "./BuildingByLandlord";
import BarChart from "./BarChart";

class SingleLandlord extends Component {
  async componentDidMount() {
    await this.props.getSingleLandlord(this.props.match.params.landlordId);
  }

  render() {
    const { name } = this.props.landlord;
    const reviews = this.props.landlord.reviews || [];
    const tagData = this.props.landlord.tags || [];
    const buildings = this.props.landlord.buildings || [];
    const avgs = this.props.landlord.avgs || {};
    const mktAvgs = this.props.landlord.mktAvgs || {};
    const avgWouldRecommend = avgs.avgWouldRecommend || {};

    const customRenderer = (tag, size, color) => (
      <span
        key={tag.value}
        style={{
          animation: "blinker 3s linear infinite",
          animationDelay: `${Math.random() * 2}s`,
          fontSize: `${size / 5}em`,
          margin: "3px",
          padding: "3px",
          display: "inline-block",
          color: color,
        }}
      >
        {tag.value}
      </span>
    );

    return (
      <div>
        <div className="row">
          <div className="col s12 m4 l4">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title white-text">
                  {name}
                  {avgWouldRecommend.true > avgWouldRecommend.false ? (
                    <span
                      className="new badge white green-text"
                      data-badge-caption="Recommend"
                    />
                  ) : (
                    <span
                      className="new badge white red-text"
                      data-badge-caption="Not Recommended"
                    />
                  )}
                </span>
                <div>
                  <p>Overall Rating: {avgs.avgGrade}</p>
                  <p>Total Reviews: {reviews.length}</p>
                  <p>Total Buildings: {buildings.length}</p>
                </div>
              </div>
              <div className="card-action">
                <Link to="/review">
                  Submit Review <i className="material-icons icon">send</i>
                </Link>
              </div>
            </div>
            <div>
              <h6>What people say about this landlord...</h6>
              <TagCloud
                minSize={5}
                maxSize={10}
                tags={tagData}
                renderer={customRenderer}
              />
            </div>
            <br />
            <div>
              <BarChart avgs={avgs} mktAvgs={mktAvgs} />
            </div>
          </div>
          <div className="col s12 m8 l8">
            <BuildingByLandlord buildings={buildings} />
          </div>
        </div>
        <div className="divider" />
        <div>
          <h5>{reviews.length} reviews</h5>
          <ReviewList reviews={reviews} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    landlord: state.landlord,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleLandlord: (id) => dispatch(fetchSingleLandlord(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleLandlord);

//TODO:
// const SingleLandlord = (props) => {
//   console.log("props-->", props);
//   const landlordId = props.match.params.landlordId;
//   const { landlord, getSingleLandlord } = props;
//   const { name, rating, reviews } = landlord;

//   useEffect(() => {
//     getSingleLandlord(landlordId);
//   }, []);

//   return (
//     <div className="container">
//       <h4>Landlord Summary</h4>
//       <div>
//         <p>Name: {name}</p>
//         <p>Overall Rating: {rating}</p>
//         <p>Total Reviews: {reviews.length}</p>
//         <p>Total Buildings: [Placeholder]</p>
//       </div>
//       <h4>Tag Cloud</h4>
//       <div>
//         <TagCloud minSize={12} maxSize={35} tags={reviews} />
//       </div>
//     </div>
//   );
// };
