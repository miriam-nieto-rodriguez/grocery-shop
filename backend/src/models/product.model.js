const {
    DataTypes
} = require('sequelize')
const sequelize = require('../config/db')

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },

    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

})

module.exports = Product