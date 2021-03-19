import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchSingleLandlord } from "../store/singleLandlord";
import { Link } from "react-router-dom";
import { TagCloud } from "react-tagcloud";

class SingleLandlord extends Component {
  componentDidMount() {
    this.props.getSingleLandlord(this.props.match.params.landlordId);
  }

  render() {
    // console.log("props.landlord->", this.props.landlord);
    const { name, rating } = this.props.landlord;
    const reviews = this.props.landlord.reviews || [];

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
          <div className="col s12 m6">
            <div className="card blue-grey darken-3">
              <div className="card-content blue-grey-text text-lighten-4">
                <span className="card-title white-text">{name}</span>
                <div>
                  <p>Overall Rating: {rating}</p>
                  <p>Total Reviews: {reviews.length}</p>
                  <p>Total Buildings: [placeholder]</p>
                </div>
              </div>
              <div className="card-action">
                <Link to="/reviewform">
                  <button
                    type="submit"
                    className="btn waves-effect waves-light orange darken-2"
                  >
                    Submit Review <i className="material-icons right">send</i>
                  </button>
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
          <p>Placeholder: ReviewList component</p>
          {/* <ReivewList /> */}
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
