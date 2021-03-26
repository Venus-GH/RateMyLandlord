import React from "react";
import { useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { action } from "@storybook/addon-actions";

const NYCPopulation = (props) => {
  const [show, setShow] = useState(true);
  const [secondshow, setSecondShow] = useState(false);
  const [thirdshow, setThirdShow] = useState(false);
  //   const [selected, setSelected] = useState < 0 || undefined > 0;
  //   const [hovered, setHovered] = (useState < 0) | (undefined > undefined);
  // another year set?
  // NYC  pop = 8560072
  let pop = [
    { key: "Bronx", population: 1455846, percentage: 17 },
    { key: "Manhattan", population: 2635121, percentage: 19.32 },
    { key: "Brooklyn", population: 1653877, percentage: 30.78 },
    { key: "Queens", population: 2339280, percentage: 27.33 },
    { key: "Staten Island", population: 475948, percentage: 5.56 },
  ];
  //   nycpop2 = 8268999
  let pop2 = [
    { key: "Bronx", population: 1397315, percentage: 16.9 },
    { key: "Manhattan", population: 1605272, percentage: 19.41 },
    { key: "Brooklyn", population: 2539789, percentage: 30.71 },
    { key: "Queens", population: 2256400, percentage: 27.28 },
    { key: "Staten Island", population: 470223, percentage: 5.68 },
  ];

  //   nycpop  = 8302659
  let pop3 = [
    { key: "Bronx", population: 1381529, percentage: 16.6 },
    { key: "Manhattan", population: 1620962, percentage: 19.5 },
    { key: "Brooklyn", population: 2538140, percentage: 30.5 },
    { key: "Queens", population: 2278860, percentage: 27.4 },
    { key: "Staten Island", population: 483168, percentage: 5.8 },
  ];
  //   let data = ages;
  let data = [
    {
      color: "#E38627",
      title: "Bronx",
      value: 1397315,
    },
    {
      color: "#C13C37",
      title: "Manhattan",
      value: 2635121,
    },
    {
      color: "#6A2135",
      title: "Brooklyn",
      value: 1653877,
    },
    {
      color: "#FF5733",
      title: "Queens",
      value: 2256400,
    },
    {
      color: "#9C2A12",
      title: "Staten Island",
      value: 475948,
    },
  ];
  let data2 = [
    {
      color: "#E38627",
      title: "Bronx",
      value: 1455846,
    },
    {
      color: "#C13C37",
      title: "Manhattan",
      value: 1605272,
    },
    {
      color: "#6A2135",
      title: "Brooklyn",
      value: 2539789,
    },
    {
      color: "#FF5733",
      title: "Queens",
      value: 2339280,
    },
    {
      color: "#9C2A12",
      title: "Staten Island",
      value: 470223,
    },
  ];
  let data3 = [
    {
      color: "#E38627",
      title: "Bronx",
      value: 1381529,
    },
    {
      color: "#C13C37",
      title: "Manhattan",
      value: 1620962,
    },
    {
      color: "#6A2135",
      title: "Brooklyn",
      value: 2538140,
    },
    {
      color: "#FF5733",
      title: "Queens",
      value: 2278860,
    },
    {
      color: "#9C2A12",
      title: "Staten Island",
      value: 483168,
    },
  ];

  pop.map((obj) => {
    var randomColor = "#000000".replace(/0/g, function () {
      return (~~(Math.random() * 16)).toString(16);
    });

    let insert = {
      color: randomColor,
      title: obj.key,
      value: obj.votes,
    };

    // data.push(insert);
  });

  const renderRows = pop.map((obj) => {
    return (
      <tr key={`group-${obj.key}`}>
        <td>{obj.key}</td>
        <td>{obj.population}</td>
        <td>{obj.percentage >= 100 ? obj.percentage / 2 : obj.percentage}%</td>
      </tr>
    );
  });

  const renderRows2 = pop2.map((obj) => {
    return (
      <tr key={`group-${obj.key}`}>
        <td>{obj.key}</td>
        <td>{obj.population}</td>
        <td>{obj.percentage >= 100 ? obj.percentage / 2 : obj.percentage}%</td>
      </tr>
    );
  });
  return (
    <div id="outside-container">
      <div className="inline-container">
        <h5 className="center">Population by Borough</h5>
      </div>
      <div className="center">
        <Link to="/explore">
          <button
            className=" btn btn-small waves-effect waves-light teal lighten-4 black-text"
            type="button"
          >
            Back to Explore
            <i className="material-icons left center">arrow_back</i>
          </button>
        </Link>
      </div>
      <div>
        <div onClick={(e) => setShow(!show)}>
          {" "}
          <p className="sidebar">
            avg 2013-2017 {show ? <FaChevronDown /> : <FaChevronUp />}
          </p>
        </div>
        <div onClick={(e) => setSecondShow(!secondshow)}>
          {" "}
          <p className="sidebar">
            avg 2009-2013 {secondshow ? <FaChevronDown /> : <FaChevronUp />}
          </p>
        </div>
        <div onClick={(e) => setThirdShow(!thirdshow)}>
          {" "}
          <p className="sidebar">
            avg 2005-2009 {thirdshow ? <FaChevronDown /> : <FaChevronUp />}
          </p>
        </div>
      </div>
      <div>
        {show ? (
          <>
            <div className="chart-container">
              <PieChart
                // onClick={console.log("hi")}
                // segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
                // segmentsShift={(index) => (index === selected ? 6 : 1)}
                // onClick={(event, index) => {
                //   action("CLICK")(event, index);
                //   console.log("CLICK", { event, index });
                //   setSelected(index === selected ? undefined : index);
                // }}
                // onMouseOver={console.log("hi")}
                // onMouseOut={() => {
                //   setHovered(undefined);
                // }}
                animate
                animationDuration={500}
                animationEasing="ease-out"
                center={[150, 150]}
                data={data}
                lengthAngle={360}
                lineWidth={15}
                paddingAngle={5}
                radius={50}
                //   rounded
                startAngle={0}
                viewBoxSize={[300, 300]}
                label={(data) => data.dataEntry.title}
                labelPosition={112}
                labelStyle={{
                  fontSize: "10px",
                  fontColor: "FFFFFA",
                  fontWeight: "800",
                }}
              />
            </div>

            <table>
              <thead>
                <tr>
                  <th>Borough</th>
                  <th>Population</th>
                  <th>Percentage of Total NYC Population</th>
                </tr>
              </thead>
              <tbody>{renderRows}</tbody>
            </table>
          </>
        ) : null}

        {secondshow ? (
          <>
            <div className="chart-container">
              <PieChart
                animate
                animationDuration={500}
                animationEasing="ease-out"
                center={[150, 150]}
                data={data}
                lengthAngle={360}
                lineWidth={15}
                paddingAngle={5}
                radius={50}
                startAngle={0}
                viewBoxSize={[300, 300]}
                label={(data) => data.dataEntry.title}
                labelPosition={112}
                labelStyle={{
                  fontSize: "10px",
                  fontColor: "FFFFFA",
                  fontWeight: "800",
                }}
              />
            </div>

            <table>
              <thead>
                <tr>
                  <th>Borough</th>
                  <th>Population</th>
                  <th>Percentage of Total NYC Population</th>
                </tr>
              </thead>
              <tbody>{renderRows2}</tbody>
            </table>
          </>
        ) : null}

        {thirdshow ? (
          <>
            <div className="chart-container">
              <PieChart
                animate
                animationDuration={500}
                animationEasing="ease-out"
                center={[150, 150]}
                data={data}
                lengthAngle={360}
                lineWidth={15}
                paddingAngle={5}
                radius={50}
                startAngle={0}
                viewBoxSize={[300, 300]}
                label={(data) => data.dataEntry.title}
                labelPosition={112}
                labelStyle={{
                  fontSize: "10px",
                  fontColor: "FFFFFA",
                  fontWeight: "800",
                }}
              />
            </div>

            <table>
              <thead>
                <tr>
                  <th>Borough</th>
                  <th>Population</th>
                  <th>Percentage of Total NYC Population</th>
                </tr>
              </thead>
              <tbody>{renderRows}</tbody>
            </table>
          </>
        ) : null}
      </div>

      <style jsx>{`
        .chart-container {
          height: 600px;
          margin-left: auto;
          margin-right: auto;
          width: 600px;
        }

        .inline-container {
          align-items: center;
          display: flex;
          flex-direction: row;
          justify-content: center;
          width: 100%;
        }

        table {
          margin-left: auto;
          margin-right: auto;
          margin-top: -20em;
          table-layout: fixed;
          width: 90%;
        }
        table tr th {
          text-align: left;
          background: gray;
          color: white;
        }
        svg {
          margin-top: -200px;
          //   margin-bottom: -200px;
        }
      `}</style>
    </div>
  );
};

export default NYCPopulation;
