const User = require('./user')
const Landlord = require('./landlord')
const Review = require('./review')
const Building = require('./building')

User.hasMany(Review)
Review.belongsTo(User)

Landlord.hasMany(Review)
Review.belongsTo(Landlord)

Building.hasMany(Review)
Review.belongsTo(Building)

Landlord.hasMany(Building)
Building.belongsTo(Landlord)

module.exports = {
  User,
  Landlord,
  Building,
  Review
}
