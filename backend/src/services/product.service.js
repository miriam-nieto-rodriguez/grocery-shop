const Category = require('../models/category.model');
const Product = require('../models/product.model');
const { Op } = require('sequelize');

const getAllProducts = async (page = 1, limit = 10, categoryId, searchText) => {
    const offset = (page - 1) * limit

    // Si hay categoryId, el include lleva un where filtrando por esa categoría
    // Si no hay categoryId, el include no lleva where (trae todos los productos)
    const includeOptions = categoryId
        ? [{ model: Category, where: { id: categoryId } }]
        : [{ model: Category }]

    const whereOptions = searchText
        ? { name: {[ Op.like]: `%${searchText}%`}}
        : {}
    
    const { count, rows } = await Product.findAndCountAll({ // devuelve el total de cuantos hay y los productos de esa pagina
        limit,
        offset,
        where: whereOptions,
        include: includeOptions
    });
    return { total: count, products: rows}
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

const assignCategories = async (productId, categoryIds) => {
    const product = await Product.findByPk(productId)
    if (!product) return null
    await product.setCategories(categoryIds)
    await product.reload({
        include: ['Categories']
    })
    return product
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    editProduct,
    removeProduct,
    assignCategories
}