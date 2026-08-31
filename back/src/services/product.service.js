const Product = require('../models/product.model')

const getAllProducts = async () => {
    return await Product.findAll()
}

const getProductById = async (productId) => {
    return await Product.findByPk(productId)
}

const createProduct = async (data) => {
    return await Product.create(data)
}

const editProduct = async (productId, data) => {
    const product = await Product.findByPk(productId)
    if (!product) return null
    return await product.update(data)

}

const removeProduct = async (productId) => {
    const product = await Product.findByPk(productId)
    if (!product) return null
    await product.destroy()
    return product
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    editProduct,
    removeProduct
}