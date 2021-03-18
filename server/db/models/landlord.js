const Sequelize = require('sequelize')
const db = require('../db')

const Landlord = db.define('landlord', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: 'Must enter a Landlord name.'
      }
    }
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: true,
    validate: {
      max: {
        args: [100],
        msg: 'Landlord rating must be less than 100.'
      },
      min: {
        args: [0],
        msg: 'Landlord rating must be greater than 0.'
      },
      isInt: {
        msg: 'Landlord rating must be an integer.'
      }
    }
  }
})

module.exports = Landlord
