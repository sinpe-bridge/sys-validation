const order_repository = require('../repositories/order.repository');

// service to verify if an order exists based on phone and amount
const s_verify_order_exists = async (phone, amount) => {
    const order = await order_repository.r_get_order_by_phone_and_amount(phone, amount);
    return !!order;
};

const s_save_order = async (orderData) => {
    const newOrder = await order_repository.r_save_order(orderData);
    return newOrder;
}

module.exports = {
    s_verify_order_exists,
    s_save_order
};