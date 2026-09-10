const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader?.startsWith('Bearer ')) {  // Verifica si el encabezado de autorización existe y comienza con "Bearer "
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        const token = authHeader.split(' ')[1]; // se queda con el token y descarta el Bearer
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica y decodifica el token usando la clave secreta definida en las variables de entorno
        req.user = decoded; // con esto, el usuario decodificado estará disponible en req.user para las rutas protegidas

        next();

    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
}

module.exports = {
    verifyToken
}