const router = require ('express'). Router();

const { registerSchema, loginSchema } = require('../../../schemas/auth.schema');
const { register, login, getProfile, updateProfile } = require('../../controllers/auth.controller');
const { verifyToken } = require('../../middlewares/auth.middleware');
const validateSchema = require('../../middlewares/validation.middleware');


router.post('/register', validateSchema(registerSchema),register);
router.post('/login', validateSchema(loginSchema), login);
router.get('/me', verifyToken, getProfile)
router.put('/me', verifyToken, updateProfile)

module.exports = router;