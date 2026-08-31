const products_service = require('../services/product.service')

const getAll = async (req, res) => {
    try {
        const products = await products_service.getAllProducts();
        res.json(products)
    } catch (error) {

        return res.status(500).json({
            message: 'Error al obtener todos los productos',
            error: error.message
        })
    }
}

const getById = async (req, res) => {
    try {
        const {
            productId
        } = req.params
        const product = await products_service.getProductById(productId)
        if (!product) return res.status(404).json({
            message: 'Producto no encontrado'
        })
        res.json(product)

    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener el id del producto',
            error: error.message
        })
    }
}

const create = async (req, res) => {
    try {
        const new_product = await products_service.createProduct(req.body)
        res.status(201).json(new_product)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

const edit = async (req, res) => {
    try {
        const {
            productId
        } = req.params;

        const product = await products_service.editProduct(productId, req.body)
        if (!product) return res.status(404).json({
            message: 'Producto no encontrado'
        })
        res.json(product)


    } catch (error) {
        return res.status(500).json({
            message: 'Error al actualizar el producto',
            error: error.message
        })
    }

}

const remove = async (req, res) => {
    try {
        const {
            productId
        } = req.params;

        const product = await products_service.removeProduct(productId)
        if (!product) return res.status(404).json({
            message: 'Producto no encontrado'
        })
        res.status(204).end()

    } catch (error) {
        return res.status(500).json({
            message: 'Error al borrar el producto',
            error: error.message
        })
    }
}

module.exports = {
    getAll,
    getById,
    create,
    edit,
    remove
}