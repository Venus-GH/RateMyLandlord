import React, { useState } from "react";

const data = [
  {
    link: "https://www.renthop.com/listings/879-dekalb-avenue/6/60710971",
    img:
      "https://photos.renthop.com/p/s/640x640/60710971_mb_504248b3c4022f9e17376a41cc0c6722.jpg",
    title: "879 Dekalb Avenue, Apt 6",
    neighborhood: "Bedford-Stuyvesant, Northern Brooklyn, Brooklyn",
    price: "$2,250",
  },
  {
    link: "https://www.renthop.com/listings/66-rockwell-place/18-a/60715246",
    img:
      "https://photos.renthop.com/p/s/640x640/60715246_527c493f8dd76c3adcc59f01d86a2b30.jpg",
    title: "66 Rockwell Place, Apt 18A",
    neighborhood: "Fort Greene, Northwestern Brooklyn, Brooklyn",
    price: "$4,100",
  },
  {
    link: "https://www.renthop.com/listings/66-rockwell-place/14-f/60715540",
    img:
      "https://photos.renthop.com/p/s/640x640/60715540_d9eecc8d25c2879b13fb139bbe4a2983.jpg",
    title: "66 Rockwell Place, Apt 14F",
    neighborhood: "Fort Greene, Northwestern Brooklyn, Brooklyn",
    price: "$3,125",
  },
  {
    link:
      "https://www.renthop.com/listings/180-montague-st/1-bedroom-d1/59897153",
    img:
      "https://photos.renthop.com/p/s/640x640/59897153_3886458a3a7cff83462bd6ece35c7fe2.jpg",
    title: "180 Montague St., Apt 1 BEDROO...",
    neighborhood: "Brooklyn Heights, Northwestern Brooklyn, Brooklyn",
    price: "$3,474",
  },
  {
    link: "https://www.renthop.com/listings/1284-pacific-street/1a/7586441",
    img:
      "https://photos.renthop.com/p/s/640x640/7586441_edc40de161f2b9c528fee01e093ad8de.jpg",
    title: "1284 Pacific Street, Apt 1A",
    neighborhood: "Crown Heights, Central Brooklyn, Brooklyn",
    price: "$1,690",
  },
];

class FeaturedListings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
    };
  }

  componentDidMount() {}

  render() {
    const { isLoading } = this.state;
    return (
      <div className="scrolling-wrapper">
        {data.map((apt) => (
          <div className="card">
            <img src={apt.img} />
            <div className="apt-info">
              <a href={apt.link}>{apt.title}</a>
              <p>{apt.price}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default FeaturedListings;
