const router = require ('express'). Router();

const { registerSchema, loginSchema } = require('../../../schemas/auth.schema');
const { register, login } = require('../../controllers/auth.controller');
const validateSchema = require('../../middlewares/validation.middleware');

router.post('/register', validateSchema(registerSchema),register);
router.post('/login', validateSchema(loginSchema), login);

module.exports = router;