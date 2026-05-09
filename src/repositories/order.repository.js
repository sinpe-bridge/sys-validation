const Order = require('../models/orders.model');

// repository to get payment by phone and amount
const r_get_order_by_phone_and_amount = async (phone, amount) => {
    const verifyExists = await Order.findOne({
        where: {
            order_phone: phone,
            order_amount: amount    
        }
    });
    return verifyExists;
};

const r_update_order_status = async (order_id, status) => {
    const order = await Order.findByPk(order_id);
    if (!order) {
        throw new Error(`Order with id ${order_id} not found`);
    }
    order.order_status = status;
    await order.save();
    return order;
};

module.exports = {
    r_get_order_by_phone_and_amount,
    r_update_order_status
};