const Order = require('../models/order.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');
const OrderItem = require('../models/order_item.model');

const getAllOrders = async (userId) => {
    return await Order.findAll({
        where: { UserId: userId },
        include: OrderItem
    })
}

const getOrderById = async (userId, orderId) => {
    return await Order.findOne({
        where: { id: orderId, UserId: userId },
        include: OrderItem
    })
}

const createOrder = async (userId, items) => {
    const user = await User.findByPk(userId);

    if(!user) {
        throw new Error('Usuario no encontrado');
    }

    let total = 0;
    const productsFound = [];  

    for (const item of items) {
      const product = await Product.findByPk(item.productId);

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
    })

    for (let i = 0; i < items.length; i++) { 
        await order.createOrderItem({
            ProductId: items[i].productId,
            amount: items[i].amount,
            unit_price: productsFound[i].price
        })
    }
    await order.reload({ include: ['OrderItems'] }); // Recarga la orden para incluir los items de la orden y así devolver la información completa
    return order;
}


module.exports = {
    getAllOrders,
    getOrderById,
    createOrder
}