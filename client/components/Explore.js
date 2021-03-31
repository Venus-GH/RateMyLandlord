import React from "react";
import { Link } from "react-router-dom";

const Explore = () => {
  return (
    <div className="row container">
      <h4>Explore historical data by Borough</h4>
      <div>
        Are you new to NYC or just curious about what the past trends have been
        for each borough?
        <br />
        Here are some interesting data visualization you can explore based on
        the historical data for each borough!
      </div>
      <p></p>
      <div className="col s12 m3 l3">
        <div className="small card">
          <div className="card-image waves-effect waves-block waves-light">
            <Link to="/explore/pastrentprices">
              {" "}
              <img
                className="activator"
                src="https://images.squarespace-cdn.com/content/v1/57265384b09f951c90d0fed2/1528842793819-R1WBWNQ8SXG7F21KCUQ7/ke17ZwdGBToddI8pDm48kOQuQVqsivNiP1OgHcJ5kmdZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpzHCD3tzD6kBZWhVB-BibHm7yS6OS0-U0aUFLk6gVSFFA72rbKQGJ4J8Eiv7MnIPvE/graphs.jpg"
              />
            </Link>
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">
              Rent Price
              <i className="small material-icons right">more_vert</i>
            </span>
            <p>
              <Link to="/explore/pastrentprices">Click to View</Link>
            </p>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">
              Rent Price<i className="material-icons right">close</i>
            </span>
            <p>
              Data visualization on the median asking rent price by borough from
              2010 to 2020
            </p>
            <br />
            <p className="bottom">Source: StreetEasy</p>
          </div>
        </div>
      </div>

      <div className="col s12 m3 l3">
        <div className="small card">
          <div className="card-image waves-effect waves-block waves-light">
            <Link to="/explore/pastrentinv">
              {" "}
              <img
                className="activator"
                src="https://about.infogr.am/wp-content/uploads/2015/10/bar-charts-header.jpg"
              />
            </Link>
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">
              Rent Inventory
              <i className="small material-icons right">more_vert</i>
            </span>
            <p>
              <Link to="/explore/pastrentinv">Click to View</Link>
            </p>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">
              Rent Inventory<i className="material-icons right">close</i>
            </span>
            <p>
              Data visualization on the total rent inventory by borough from
              2010 to 2020
            </p>
            <br />
            <p className="bottom">Source: StreetEasy</p>
          </div>
        </div>
      </div>

      <div className="col s12 m3 l3">
        <div className="small card">
          <div className="card-image waves-effect waves-block waves-light">
            <Link to="/explore/nypdcomplaints">
              <img className="activator" src="/img/explore2.png" />
            </Link>
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">
              NYPD Complaints
              <i className="small material-icons right">more_vert</i>
            </span>
            <p>
              <Link to="/explore/nypdcomplaints">Click to View</Link>
            </p>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">
              Total NYPD Complaints by Borough
              <i className="material-icons right">close</i>
            </span>
            <p>
              Data visualization on total historical NYPD complaints received
              for each borough
            </p>
            <br />
            <p className="bottom">Source: NYC Open Data</p>
          </div>
        </div>
      </div>
      <div className="col s12 m3 l3">
        <div className="small card">
          <div className="card-image waves-effect waves-block waves-light">
            <Link to="/explore/nycpopulation">
              <img className="activator" src="/img/explore3.png" />
            </Link>
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">
              NYC Population
              <i className="small material-icons right">more_vert</i>
            </span>
            <p>
              <Link to="/explore/nycpopulation">Click to View</Link>
            </p>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">
              NYC Population
              <i className="material-icons right">close</i>
            </span>
            <p>
              Data visualization on the population of each borough as a
              percentage of NYC population over the last two decades
            </p>
            <br />
            <p className="bottom">
              Source: American Community Survey, Census Bureau, US Commerce Dept
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
