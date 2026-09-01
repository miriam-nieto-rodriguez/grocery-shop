const router = require ('express'). Router();

const { getAll, getById, create, edit, remove } = require('../../controllers/product.controller');

router.get('/', getAll);
router.get('/:productId', getById)
router.post('/', create)
router.put('/:productId', edit)
router.delete('/:productId', remove)

module.exports = router;