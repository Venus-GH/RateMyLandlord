import React from "react";
import { Link } from "react-router-dom";

const Explore = () => {
  return (
    <div className="row">
      <div className="col s12 m4 l4">
        <div className=" medium card">
          <div className="card-image waves-effect waves-block waves-light">
            <img
              className="activator"
              src="https://www.idashboards.com/wp-content/uploads/2017/10/line-graph.png"
            />
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">
              Past Rent Price
              <i className="small material-icons right">more_vert</i>
            </span>
            <p>
              <Link to="/explore/pastrentprices">Click to View</Link>
            </p>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">
              Past Rent Price<i className="material-icons right">close</i>
            </span>
            <p>
              Data visualization on the median asking rent price by borough from
              2010 to 2020
            </p>
            <br />
            <p className="bottom">Source Data: StreetEasy</p>
          </div>
        </div>
      </div>

      <div className="col s12 m4 l4">
        <div className="medium card">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator" src="/explore.jpg" />
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">
              Past Rent Inventory
              <i className="small material-icons right">more_vert</i>
            </span>
            <p>
              <Link to="/explore/pastrentinv">Click to View</Link>
            </p>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">
              Past Rent Inventory<i className="material-icons right">close</i>
            </span>
            <p>
              Data visualization on the total rent inventory by borough from
              2010 to 2020
            </p>
            <br />
            <p className="bottom">Source Data: StreetEasy</p>
          </div>
        </div>
      </div>

      <div className="col s12 m4 l4">
        <div className="medium card">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator" src="/explore2.jpg" />
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">
              Businesses by Borough
              <i className="small material-icons right">more_vert</i>
            </span>
            <p>
              <Link to="/explore/pastrentprices">Click to View</Link>
            </p>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">
              Businesses by Borough<i className="material-icons right">close</i>
            </span>
            <p>Data visualization on different businesses in each borough</p>
            <br />
            <p className="bottom">Source Data: Yelp</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
