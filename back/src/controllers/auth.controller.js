const authService = require('../services/auth.service');

const register = async (req, res) => {
    try {
        const result = await authService.registerUser(req.body);
        const {
            password,
            ...userWithoutPassword
        } = result.toJSON()

        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            user: userWithoutPassword,

        });

    } catch (error) {
        res.status(500).json({
            message: 'Error registrando usuario',
            error: error.message
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.loginUser(email, password);
    
        const { password: _ , ...userWithoutPassword } = result.user.toJSON()

        return res.status(200).json({
            message: 'Usuario logueado exitosamente',
            user: userWithoutPassword,
            token: result.token
        });

    } catch (error) {
        res.status(error.status || 500).json({
            message: 'Error iniciando sesión',
            error: error.message
        });
    }
}

module.exports = {
    register,
    login
}