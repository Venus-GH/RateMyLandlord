import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchSingleLandlord } from "../store/singleLandlord";
import { Link } from "react-router-dom";
import { TagCloud } from "react-tagcloud";
import ReviewList from "./ReviewList";

class SingleLandlord extends Component {
  componentDidMount() {
    this.props.getSingleLandlord(this.props.match.params.landlordId);
  }

  render() {
    // console.log("props.landlord->", this.props.landlord);
    const { name } = this.props.landlord;
    const reviews = this.props.landlord.reviews || [];
    const buildings = this.props.landlord.buildings || [];
    const avgs = this.props.landlord.avgs || {};
    const avgWouldRecommend = avgs.avgWouldRecommend || {};

    // console.log("avgs", avgWouldRecommend.true);
    // console.log("recommend", avgs.avgWouldRecommend.true);

    const flattenTagData = reviews.reduce((accumulator, curr) => {
      return accumulator.concat(curr.tags);
    }, []);
    // console.log("flattenTagData", flattenTagData);

    const countedTagsObj = flattenTagData.reduce((accumulator, currTag) => {
      if (currTag in accumulator) {
        accumulator[currTag]++;
      } else {
        accumulator[currTag] = 1;
      }
      return accumulator;
    }, {});
    // console.log("countedTagsObj", countedTagsObj);

    const formatTagData = objArg => {
      let arr = [];
      let keysArr = Object.keys(objArg);
      let valuesArr = Object.values(objArg);
      for (let i = 0; i < keysArr.length; i++) {
        let obj = {};
        obj.value = keysArr[i];
        obj.count = valuesArr[i];
        arr.push(obj);
      }
      return arr;
    };

    // const tagData = formatTagData(countedTagsObj);
    // console.log("tagData", tagData);
    const tagData = [
      { value: "flexible", count: 2 },
      { value: "respectful", count: 6 },
      { value: "fair", count: 8 },
      { value: "professional", count: 2 },
      { value: "timely", count: 15 }
    ];

    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m8">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title white-text">
                  {name}
                  {avgWouldRecommend.true > avgWouldRecommend.false ? (
                    <span
                      className="new badge"
                      data-badge-caption="Recommend"
                    />
                  ) : (
                    <span
                      className="new badge red"
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
                <Link to="/reviewform">
                  Submit Review <i className="material-icons icon">send</i>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h5>What people say about this landlord...</h5>
          <div>
            <TagCloud minSize={12} maxSize={35} tags={tagData} />
          </div>
          <br />
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

const mapStateToProps = state => {
  return {
    landlord: state.landlord
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSingleLandlord: id => dispatch(fetchSingleLandlord(id))
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
