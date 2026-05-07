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

module.exports = {
    r_get_order_by_phone_and_amount,
};