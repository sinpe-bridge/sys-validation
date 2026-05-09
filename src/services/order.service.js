const order_repository = require('../repositories/order.repository');

const { ORDER_STATUSES } = require('../constants/order.constants');

// service to get a order by phone and amount
const s_get_order_by_phone_and_amount = async (phone, amount) => {
    const order = await order_repository.r_get_order_by_phone_and_amount(phone, amount);
    return order;
};

// update order status
const s_update_order_status = async (order_id, status) => {
    if (!Object.values(ORDER_STATUSES).includes(status)) {
        throw new Error(`Invalid order status: "${status}"`);
    }
    const order = await order_repository.r_update_order_status(order_id, status);
    return order;
};

module.exports = {
    s_get_order_by_phone_and_amount, 
    s_update_order_status
};