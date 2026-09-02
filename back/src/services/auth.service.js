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
    const user = await User.findOne({ where: { email } });

    if(!user) {
        const error = new Error('Usuario o contraseña incorrectos');
        error.status = 401;
        throw error;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        const error = new Error('Usuario o contraseña incorrectos');
        error.status = 401;
        throw error;
    }
    
    const token = jwt.sign ({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { user, token }
}

module.exports = {
    registerUser, 
    loginUser
}