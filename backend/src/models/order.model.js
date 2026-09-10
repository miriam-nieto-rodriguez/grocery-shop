const {
    DataTypes
} = require('sequelize')
const sequelize = require('../config/db')

const Order = sequelize.define('Order', {
    status: {
        type: DataTypes.ENUM('PENDING', 'SEND', 'DELIVERED'),
        allowNull: false
    },
    
    date_order:  {
        type: DataTypes.DATE,
        allowNull: false
    },

    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },

    address: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Order