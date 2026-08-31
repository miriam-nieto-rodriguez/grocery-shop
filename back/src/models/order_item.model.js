const {
    DataTypes
} = require('sequelize')
const sequelize = require('../config/db')

const OrderItem = sequelize.define('OrderItem', {
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    unit_price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    }
});

module.exports = OrderItem