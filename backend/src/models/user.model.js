const {
    DataTypes
} = require('sequelize')
const sequelize = require('../config/db')

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },

    address: {
        type: DataTypes.STRING,
        allowNull: false
    },

    city: {
        type: DataTypes.STRING,
        allowNull: false
    },

    country: {
        type: DataTypes.STRING,
        allowNull: false
    },

    code_postal: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: 'El correo electrónico ya está registrado'
        },
        validate: {
            notEmpty: {
                msg: 'El campo de correo no puede estar vacío'
            },
            isEmail: {
                msg: 'Debe ingresarse un formato de correo válido'
            }
        }
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

})

module.exports = User;