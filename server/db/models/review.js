const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  landlordName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false,
    validate: {
      notNull: {
        msg: 'Must enter a Landlord name.'
      }
    }
  },
  grade: {
    type: Sequelize.STRING,
    allowNull: false
  },
  responsiveness: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      max: {
        args: [5],
        msg: 'Landlord responsiveness rating must be less than 5.'
      },
      min: {
        args: [0],
        msg: 'Landlord responsiveness rating must be greater than 0.'
      },
      isInt: {
        msg: 'Landlord responsiveness rating must be an integer.'
      }
    }
  },
  pestControl: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      max: {
        args: [5],
        msg: 'Pest control rating must be less than 5.'
      },
      min: {
        args: [0],
        msg: 'Pest control rating must be greater than 0.'
      },
      isInt: {
        msg: 'Pest control rating must be an integer.'
      }
    }
  },
  kindness: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      max: {
        args: [5],
        msg: 'Landlord kindness rating must be less than 5.'
      },
      min: {
        args: [0],
        msg: 'Landlord kindness rating must be greater than 0.'
      },
      isInt: {
        msg: 'Landlord kindness rating must be an integer.'
      }
    }
  },
  maintenance: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      max: {
        args: [5],
        msg: 'Landlord maintenance rating must be less than 5.'
      },
      min: {
        args: [0],
        msg: 'Landlord maintenance rating must be greater than 0.'
      },
      isInt: {
        msg: 'Landlord maintenance rating must be an integer.'
      }
    }
  },
  bedrooms: {
    type: Sequelize.FLOAT,
    allowNull: true,
    validate: {
      min: {
        args: [0],
        msg: 'Bedrooms must be greater than 0.'
      }
    }
  },
  rent: {
    type: Sequelize.INTEGER,
    allowNull: true,
    validate: {
      min: {
        args: [0],
        msg: 'Rent must be greater than 0.'
      },
      isInt: {
        msg: 'Rent must be an integer.'
      }
    }
  },
  leaseLength: {
    type: Sequelize.INTEGER,
    allowNull: true,
    validate: {
      isInt: {
        msg: 'Lease length must be an integer number of months.'
      }
    }
  },
  startDate: {
    type: Sequelize.STRING,
    allowNull: true
  },
  comments: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  wouldRecommend: {
    type: Sequelize.BOOLEAN
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = Review
