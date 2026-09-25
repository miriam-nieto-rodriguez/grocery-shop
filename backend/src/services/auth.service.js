const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const registerUser = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await User.create({
        ...data,
        password: hashedPassword
    });
    return user;
}

const loginUser = async (email, password) => {
    const user = await User.findOne({
        where: {
            email
        }
    });

    if (!user) {
        const error = new Error('Usuario o contraseña incorrectos');
        error.status = 401;
        throw error;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        const error = new Error('Usuario o contraseña incorrectos');
        error.status = 401;
        throw error;
    }

    const token = jwt.sign({
        id: user.id
    }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
    return {
        user,
        token
    }
}

const getProfile = async (userId) => {
    return await User.findByPk(userId)
}

const update = async (userId, updateData) => {
    //  Extraemos solo los campos permitidos
    const {
        name,
        surname,
        photo,
        address,
        city
    } = updateData;

    // Actualizamos el registro en la BD
    await User.update({
        name,
        surname,
        photo,
        address,
        city
    }, {
        where: {
            id: userId
        }
    });
    // Devolvemos el usuario actualizado
    return await User.findByPk(userId, {
        attributes: {
            exclude: ['password']
        }
    });
}

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    update
}