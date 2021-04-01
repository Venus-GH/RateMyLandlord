import React from "react";
import Ratings from "react-ratings-declarative";
import { connect } from "react-redux";
import { _addMaintenanceReview } from "../../store/reviews";

class MaintenanceReview extends React.Component {
  constructor() {
    super();
    this.state = {
      rating: 0,
    };
    this.changeRating = this.changeRating.bind(this);
  }

  changeRating(newRating) {
    this.setState({
      rating: newRating,
    });
    this.props.sendMaintenance(newRating);
  }
  render() {
    return (
      <div>
        <p>Maintenance Rating</p>
        <Ratings
          rating={this.state.rating}
          widgetRatedColors="gold"
          widgetHoverColors="gold"
          changeRating={this.changeRating}
          widgetDimensions="20px"
        >
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
        </Ratings>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendMaintenance: (rating) => dispatch(_addMaintenanceReview(rating)),
  };
};

export default connect(null, mapDispatchToProps)(MaintenanceReview);
