const Sequelize = require('sequelize')
const db = require('../db')

const Building = db.define('building', {
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: 'Must enter a Building address.'
      }
    }
  },
  latitude: {
    type: Sequelize.DECIMAL,
    allowNull: true,
    validate: {
      isDecimal: {
        msg: 'Building latitude must be a decimal.'
      }
    }
  },
  longitude: {
    type: Sequelize.DECIMAL,
    allowNull: true,
    validate: {
      isDecimal: {
        msg: 'Building longitude must be a decimal.'
      }
    }
  },
  borough: {
    type: Sequelize.ENUM(
      'Manhattan',
      'Brooklyn',
      'Queens',
      'Bronx',
      'Staten Island'
    ),
    allowNull: true
  }
})

module.exports = Building
