import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";

class FeaturedListings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
    };
  }

  async componentDidMount() {
    const { neighborhood, price } = this.props;
    let url;
    if (neighborhood && price) {
      url = `https://www.renthop.com/nyc/${neighborhood}-apartments/?max_price=${price}`;
    } else {
      url = "https://www.renthop.com/nyc/apartments-for-rent";
    }
    const { data } = await axios.get(`/api/featured/?url=${url}`);
    this.setState({ data: data, isLoading: false });
  }

  async componentDidUpdate(prev) {
    if (
      this.props.neighborhood !== prev.neighborhood ||
      this.props.price !== prev.price
    ) {
      this.setState({ isLoading: true });
      const { neighborhood, price } = this.props;
      let url = `https://www.renthop.com/nyc/${neighborhood}-apartments/?max_price=${price}`;
      const { data } = await axios.get(`/api/featured/?url=${url}`);
      this.setState({ data: data, isLoading: false });
    }
  }

  render() {
    const { isLoading, data } = this.state;
    return isLoading ? (
      <h4 className="featured-loading">
        Finding some apartments you might like...
      </h4>
    ) : (
      <div className="featured-container">
        <h4>We thought you might like these:</h4>
        <div className="scrolling-wrapper">
          {data.map((apt) => (
            <div className="carousel-card">
              <img src={apt.img} />
              <div className="apt-info">
                <a href={apt.link}>{apt.title}</a>
                <p>{apt.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  user: state.user,
});

export default connect(mapState)(FeaturedListings);
