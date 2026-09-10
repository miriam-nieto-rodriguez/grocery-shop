const Order = require('../models/order.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');
const OrderItem = require('../models/order_item.model');
const sequelize = require('../config/db');

const getAllOrders = async (userId) => {
    return await Order.findAll({
        where: {
            UserId: userId
        },
        include: OrderItem
    })
}

const getOrderById = async (userId, orderId) => {
    return await Order.findOne({
        where: {
            id: orderId,
            UserId: userId
        },
        include: OrderItem
    })
}

const createOrder = async (userId, items) => {
    const t = await sequelize.transaction(); // Inicia una transacción para asegurar que todas las operaciones se realicen correctamente
    try {

        const user = await User.findByPk(userId, {
            transaction: t
        }); // Busca el usuario por su ID dentro de la transacción


        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        let total = 0;
        const productsFound = [];

        for (const item of items) {
            const product = await Product.findByPk(item.productId, {
                transaction: t
            }); // Busca el producto por su ID dentro de la transacción

            if (!product) {
                throw new Error(`Producto con ID ${item.productId} no encontrado`);
            }

            total += product.price * item.amount;
            productsFound.push(product) // Almacena el producto encontrado en el array y asi no se pierde la referencia al producto y se puede usar más adelante si es necesario
        }

        const order = await user.createOrder({
            total,
            address: user.address,
            status: 'PENDING',
            date_order: new Date(),
        }, {
            transaction: t
        });

        for (let i = 0; i < items.length; i++) {
            await order.createOrderItem({
                ProductId: items[i].productId,
                amount: items[i].amount,
                unit_price: productsFound[i].price
            }, {
                transaction: t
            })
        }

        await order.reload({
            include: ['OrderItems'],
            transaction: t
        }); // Recarga la orden para incluir los items de la orden y así devolver la información completa
        
        await t.commit(); // Confirma la transacción si todo se realizó correctamente
        return order;

    } catch (error) {
        await t.rollback(); // Revierte la transacción en caso de error
        throw error;
    }
}


module.exports = {
    getAllOrders,
    getOrderById,
    createOrder
}