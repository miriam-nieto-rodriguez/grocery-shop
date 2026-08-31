const { getAll, getById, create, edit, remove } = require('../../controllers/product.controller');

const router = require ('express'). Router();

router.get('/', getAll);
router.get('/:productId', getById)
router.post('/', create)
router.put('/:productId', edit)
router.delete('/:productId', remove)

module.exports = router;