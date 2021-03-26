import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import NYPDChart from "./NYPDChart";
import { Link } from "react-router-dom";

const NYPD = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://data.cityofnewyork.us/resource/qgea-i56i.json?$select=date_extract_y(RPT_DT)%20as%20year,%20BORO_NM,%20count(*)&$group=year,%20BORO_NM"
        );
        setComplaints(data);
      } catch (error) {
        console.log("Error fetching data from Open Source API", error);
      }
    };
    fetchData();
  }, []);

  //   console.log("complaints", complaints);

  const complaintsData = [
    {
      year: "2006",
      BRONX: 111263,
      BROOKLYN: 157808,
      MANHATTAN: 127654,
      QUEENS: 105425,
      "STATEN ISLAND": 27022,
    },
    {
      year: "2007",
      BRONX: 117154,
      BROOKLYN: 155830,
      MANHATTAN: 130216,
      QUEENS: 105634,
      "STATEN ISLAND": 26126,
    },
    {
      year: "2008",
      BRONX: 114191,
      BROOKLYN: 155632,
      MANHATTAN: 128514,
      QUEENS: 102885,
      "STATEN ISLAND": 26735,
    },
    {
      year: "2009",
      BRONX: 112973,
      BROOKLYN: 150739,
      MANHATTAN: 124811,
      QUEENS: 99187,
      "STATEN ISLAND": 24276,
    },
    {
      year: "2010",
      BRONX: 111566,
      BROOKLYN: 151482,
      MANHATTAN: 121391,
      QUEENS: 98575,
      "STATEN ISLAND": 24114,
    },
    {
      year: "2011",
      BRONX: 108657,
      BROOKLYN: 151497,
      MANHATTAN: 115844,
      QUEENS: 98639,
      "STATEN ISLAND": 23424,
    },
    {
      year: "2012",
      BRONX: 106790,
      BROOKLYN: 154885,
      MANHATTAN: 119706,
      QUEENS: 98927,
      "STATEN ISLAND": 23614,
    },
    {
      year: "2013",
      BRONX: 104421,
      BROOKLYN: 150184,
      MANHATTAN: 118294,
      QUEENS: 101291,
      "STATEN ISLAND": 22721,
    },
    {
      year: "2014",
      BRONX: 105861,
      BROOKLYN: 148700,
      MANHATTAN: 113345,
      QUEENS: 100245,
      "STATEN ISLAND": 22846,
    },
    {
      year: "2015",
      BRONX: 104912,
      BROOKLYN: 143116,
      MANHATTAN: 113231,
      QUEENS: 94842,
      "STATEN ISLAND": 22131,
    },
    {
      year: "2016",
      BRONX: 106050,
      BROOKLYN: 140601,
      MANHATTAN: 115624,
      QUEENS: 94461,
      "STATEN ISLAND": 21831,
    },
    {
      year: "2017",
      BRONX: 103505,
      BROOKLYN: 137701,
      MANHATTAN: 114615,
      QUEENS: 91577,
      "STATEN ISLAND": 21295,
    },
    {
      year: "2018",
      BRONX: 101018,
      BROOKLYN: 136853,
      MANHATTAN: 114675,
      QUEENS: 90369,
      "STATEN ISLAND": 20851,
    },
    {
      year: "2019",
      BRONX: 104825,
      BROOKLYN: 138382,
      MANHATTAN: 121550,
      QUEENS: 97201,
      "STATEN ISLAND": 20003,
    },
  ];

  return (
    <div>
      <h5 className="center">NYPD Complaints by Borough</h5>
      <p className="center">
        2006 through 2019
        <br />
        <Link to="/explore">
          <button
            className="btn btn-small waves-effect waves-light teal lighten-4 black-text"
            type="button"
          >
            Back to Explore
            <i className="material-icons left">arrow_back</i>
          </button>
        </Link>
      </p>
      <NYPDChart complaints={complaintsData} />
    </div>
  );
};

export default NYPD;
