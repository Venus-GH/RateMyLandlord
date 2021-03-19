"use strict";

const db = require("../server/db");
const { User, Building, Landlord, Review } = require("../server/db/models");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const users = [
    {
      email: "cody@email.com",
      perferredName: "Cody",
      password: "123",
    },
    {
      email: "murphy@email.com",
      perferredName: "Murphy",
      password: "123",
    },
    {
      name: "Cooper",
      email: "cooper@email.com",
      password: "123",
    },
    {
      name: "Calandra",
      isAdmin: true,
      email: "calandra@email.com",
      password: "123",
    },
    {
      name: "Nikki",
      isAdmin: true,
      email: "nikki@email.com",
      password: "123",
    },
    {
      name: "Nuala",
      isAdmin: true,
      email: "nuala@email.com",
      password: "123",
    },
    {
      name: "Heather",
      isAdmin: true,
      email: "heather@email.com",
      password: "123",
    },
  ];

  const [
    cody,
    murphy,
    cooper,
    calandra,
    nikki,
    nuala,
    heather,
  ] = await Promise.all(users.map((user) => User.create(user)));

  const landlords = [
    {
      name: "Blackstone Group",
      rating: 67,
    },
    {
      name: "LeFrank Organization",
      rating: 42,
    },
    {
      name: "A&E Real Estate Holdings",
      rating: 81,
    },
    {
      name: "Related Rentals",
      rating: 94,
    },
    {
      name: "Sabat Group",
      rating: 33,
    },
  ];

  const [blackstone, lefrank, ae, related, sabat] = await Promise.all(
    landlords.map((landlord) => Landlord.create(landlord))
  );

  const buildings = [
    {
      address: "61 E 7th St, New York, NY 10003",
      latitude: 40.72788101991443,
      longitude: -73.98702320411665,
      borough: "Manhattan",
      landlordId: sabat.id,
    },
    {
      address: "64 Downing St, New York, NY 10014",
      latitude: 40.729005286653184,
      longitude: -74.00481492925742,
      borough: "Manhattan",
      landlordId: sabat.id,
    },
    {
      address: "420 W 55th St, New York, NY 10019",
      latitude: 40.7426557304367,
      longitude: -73.98165371535876,
      borough: "Manhattan",
      landlordId: related.id,
    },
    {
      address: "141 E 28th St, New York, NY 10016",
      latitude: 40.72788101991443,
      longitude: -73.98702320411665,
      borough: "Manhattan",
      landlordId: ae.id,
    },
    {
      address: "149 W 14th St, New York, NY 10011",
      latitude: 40.73863222152678,
      longitude: -73.99888675993972,
      borough: "Manhattan",
      landlordId: sabat.id,
    },
    {
      address: "61 Wooster St, New York, NY 10012",
      latitude: 40.72334659149321,
      longitude: -74.00198202901962,
      borough: "Manhattan",
      landlordId: related.id,
    },
    {
      address: "145 Norfolk St, New York, NY 10002",
      latitude: 40.72032990449303,
      longitude: -73.98648958962771,
      borough: "Manhattan",
      landlordId: blackstone.id,
    },
    {
      address: "2534 Bathgate Ave, The Bronx, NY 10458",
      latitude: 40.86003048038912,
      longitude: -73.88660364459504,
      borough: "Bronx",
      landlordId: lefrank.id,
    },
    {
      address: "340 W 57th St, New York, NY 10019",
      latitude: 40.76742049274174,
      longitude: -73.98466027343284,
      borough: "Manhattan",
      landlordId: related.id,
    },
    {
      address: "926 Lafayette Ave, Brooklyn, NY 11221",
      latitude: 40.69160456837008,
      longitude: -73.93531081576434,
      borough: "Brooklyn",
      landlordId: blackstone.id,
    },
    {
      address: "153 Lexington Ave, Brooklyn, NY 11216",
      latitude: 40.687500636173375,
      longitude: -73.95623254459989,
      borough: "Brooklyn",
      landlordId: lefrank.id,
    },
    {
      address: "79 Jewel St, Brooklyn, NY 11222",
      latitude: 40.72724531332582,
      longitude: -73.94678133295196,
      borough: "Brooklyn",
      landlordId: ae.id,
    },
    {
      address: "333 Schermerhorn St, Brooklyn, NY 11217",
      latitude: 40.687771359670485,
      longitude: -73.9813810176117,
      borough: "Brooklyn",
      landlordId: blackstone.id,
    },
    {
      address: "81 Fleet Pl, Brooklyn, NY 11201",
      latitude: 40.69334631269403,
      longitude: -73.98126410227022,
      borough: "Brooklyn",
      landlordId: ae.id,
    },
  ];

  const [
    east7,
    downing,
    west55,
    east28,
    west14,
    wooster,
    norfolk,
    bathgate,
    west57,
    lafayette,
    lexington,
    jewel,
    schermerhorn,
    fleet,
  ] = await Promise.all(buildings.map((building) => Building.create(building)));

  // TAGS:
  // slumlord, unfriendly, hard to reach, rude, unreliable
  // responsive, respectful, fair, friendly, trustworthy, reliable, professional, flexible, timely, helpful
  const reviews = [
    {
      landlordName: "Sabat Group",
      grade: 3,
      responsiveness: 2,
      pestControl: 4,
      kindness: 3,
      maintenance: 4,
      bedrooms: 2,
      rent: 3000,
      leaseLength: 12,
      startDate: "02/05/2019",
      comments: "HATED the landlord. Aweful.",
      wouldRecommend: false,
      tags: ["slumlord", "unfriendly", "hard to reach", "rude"],
      userId: cody.id,
      buildingId: downing.id,
      landlordId: downing.landlordId,
    },
    {
      landlordName: "Sabat Group",
      grade: 3,
      responsiveness: 2,
      pestControl: 3,
      kindness: 3,
      maintenance: 4,
      bedrooms: 2,
      rent: 3000,
      leaseLength: 12,
      startDate: "02/05/2019",
      comments:
        "Great building, awful landlord. Is the location worth dealing with management? That's for you to decide...",
      wouldRecommend: false,
      tags: ["unfriendly", "hard to reach", "rude"],
      userId: cody.id,
      buildingId: west14.id,
      landlordId: west14.landlordId,
    },
    {
      landlordName: "Sabat Group",
      grade: 1,
      responsiveness: 1,
      pestControl: 3,
      kindness: 3,
      maintenance: 3,
      bedrooms: 2,
      rent: 3600,
      leaseLength: 12,
      startDate: "07/12/2018",
      comments: "Just AWFUL. Nuff said...",
      wouldRecommend: false,
      tags: ["slumlord", "unfriendly", "hard to reach", "unreliable"],
      userId: murphy.id,
      buildingId: downing.id,
      landlordId: downing.landlordId,
    },
    {
      landlordName: "Sabat Group",
      grade: 4,
      responsiveness: 4,
      pestControl: 4,
      kindness: 3,
      maintenance: 3,
      bedrooms: 2,
      rent: 3500,
      leaseLength: 12,
      startDate: "02/01/2018",
      comments:
        "Not great, but not terrible. Doesn't address problems in a timely manner.",
      wouldRecommend: false,
      tags: ["unreliable", "hard to reach"],
      userId: cody.id,
      buildingId: east7.id,
      landlordId: east7.landlordId,
    },
    {
      landlordName: "Related",
      grade: 5,
      responsiveness: 5,
      pestControl: 4,
      kindness: 5,
      maintenance: 5,
      bedrooms: 1,
      rent: 2850,
      leaseLength: 24,
      startDate: "06/01/2019",
      comments:
        "Landlord was wonderful. Always responded in a timely manner. Super helpful.",
      wouldRecommend: true,
      tags: ["responsive", "friendly", "reliable", "helpful"],
      userId: cooper.id,
      buildingId: west55.id,
      landlordId: west55.landlordId,
    },
    {
      landlordName: "Related",
      grade: 5,
      responsiveness: 5,
      pestControl: 5,
      kindness: 5,
      maintenance: 5,
      bedrooms: 1,
      rent: 4200,
      leaseLength: 12,
      startDate: "03/15/2021",
      comments:
        "Second time renting from this landlord. If you have the change to live in a Related building, definitely take it!",
      wouldRecommend: true,
      tags: ["responsive", "reliable", "helpful", "timely", "flexible"],
      userId: cooper.id,
      buildingId: wooster.id,
      landlordId: wooster.landlordId,
    },
    {
      landlordName: "Related",
      grade: 5,
      responsiveness: 5,
      pestControl: 4,
      kindness: 5,
      maintenance: 5,
      bedrooms: 1,
      rent: 3000,
      leaseLength: 24,
      startDate: "05/01/2019",
      comments:
        "Great landlord. They do an excellent job maintaining the building and promptly responding when issues arise.",
      wouldRecommend: true,
      tags: ["responsive", "timely", "reliable", "flexible"],
      userId: calandra.id,
      buildingId: west57.id,
      landlordId: west57.landlordId,
    },
    {
      landlordName: "Blackstone Group",
      grade: 4,
      responsiveness: 3,
      pestControl: 4,
      kindness: 3,
      maintenance: 4,
      bedrooms: 1,
      rent: 2500,
      leaseLength: 24,
      startDate: "06/01/2019",
      comments:
        "Not very friendly or responsive, but they keep the building clean enough.",
      wouldRecommend: true,
      tags: ["responsive", "unfriendly"],
      userId: cooper.id,
      buildingId: norfolk.id,
      landlordId: norfolk.landlordId,
    },
    {
      landlordName: "Blackstone Group",
      grade: 3,
      responsiveness: 4,
      pestControl: 3,
      kindness: 4,
      maintenance: 3,
      bedrooms: 1,
      rent: 3100,
      leaseLength: 24,
      startDate: "06/01/2020",
      comments:
        "Landlord is responsive and kind, but maintenance could be much better.",
      wouldRecommend: true,
      tags: ["responsive", "friendly"],
      userId: cooper.id,
      buildingId: norfolk.id,
      landlordId: norfolk.landlordId,
    },
    {
      landlordName: "Blackstone Group",
      grade: 5,
      responsiveness: 5,
      pestControl: 5,
      kindness: 5,
      maintenance: 5,
      bedrooms: 1,
      rent: 3000,
      leaseLength: 24,
      startDate: "06/01/2020",
      comments: "Love my building! Good job, Blackstone!",
      wouldRecommend: true,
      tags: ["responsive", "friendly", "timely", "helpful"],
      userId: nuala.id,
      buildingId: lafayette.id,
      landlordId: lafayette.landlordId,
    },
    {
      landlordName: "Blackstone Group",
      grade: 5,
      responsiveness: 4,
      pestControl: 5,
      kindness: 4,
      maintenance: 5,
      bedrooms: 1,
      rent: 3000,
      leaseLength: 12,
      startDate: "05/15/2018",
      comments: "Landlord is pretty good. I am happy with my time here.",
      wouldRecommend: true,
      tags: ["responsive", "friendly", "respectful", "fair"],
      userId: heather.id,
      buildingId: schermerhorn.id,
      landlordId: schermerhorn.landlordId,
    },
    {
      landlordName: "A&E Real Estate Holdings",
      grade: 4,
      responsiveness: 4,
      pestControl: 4,
      kindness: 4,
      maintenance: 3,
      bedrooms: 2,
      rent: 4000,
      leaseLength: 12,
      startDate: "10/01/2019",
      comments: "Just eh... Good enough.",
      wouldRecommend: true,
      tags: ["flexible", "friendly", "respectful", "fair"],
      userId: cody.id,
      buildingId: east28.id,
      landlordId: east28.landlordId,
    },
    {
      landlordName: "A&E Real Estate Holdings",
      grade: 4,
      responsiveness: 4,
      pestControl: 4,
      kindness: 4,
      maintenance: 3,
      bedrooms: 2,
      rent: 4200,
      leaseLength: 12,
      startDate: "08/01/2019",
      comments: "Landlord has been great. Keep it up, A&E",
      wouldRecommend: true,
      tags: ["flexible", "friendly", "timely", "respectful", "fair"],
      userId: cody.id,
      buildingId: jewel.id,
      landlordId: jewel.landlordId,
    },
    {
      landlordName: "A&E Real Estate Holdings",
      grade: 4,
      responsiveness: 4,
      pestControl: 4,
      kindness: 4,
      maintenance: 3,
      bedrooms: 2,
      rent: 3250,
      leaseLength: 12,
      startDate: "04/01/2020",
      comments:
        "This building has such great potential that the landlord has not uncovered. A little more work would go a long way, A&E...",
      wouldRecommend: true,
      tags: ["timely", "fair"],
      userId: nikki.id,
      buildingId: fleet.id,
      landlordId: fleet.landlordId,
    },
    {
      landlordName: "LeFrank Organization",
      grade: 4,
      responsiveness: 4,
      pestControl: 4,
      kindness: 4,
      maintenance: 4,
      bedrooms: 2,
      rent: 1850,
      leaseLength: 12,
      startDate: "08/25/2017",
      comments:
        "Old, run-down building, but LeFrank was a good landlord.Whenever I had a problem, they responded promptly.",
      wouldRecommend: true,
      tags: ["flexible", "respectful", "fair", "professional", "timely"],
      userId: calandra.id,
      buildingId: bathgate.id,
      landlordId: bathgate.landlordId,
    },
    {
      landlordName: "LeFrank Organization",
      grade: 2,
      responsiveness: 3,
      pestControl: 3,
      kindness: 3,
      maintenance: 3,
      bedrooms: 1,
      rent: 1550,
      leaseLength: 12,
      startDate: "06/01/2019",
      comments: "Nice enough and prompt, but did a terrible job.",
      wouldRecommend: true,
      tags: ["flexible", "respectful", "fair", "professional", "timely"],
      userId: murphy.id,
      buildingId: lexington.id,
      landlordId: lexington.landlordId,
    },
  ];

  await Promise.all(reviews.map((review) => Review.create(review)));
  console.log(
    `seeded ${users.length} users, ${buildings.length} buildings, ${landlords.length} landlords, ${reviews.length} reviews`
  );

  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
