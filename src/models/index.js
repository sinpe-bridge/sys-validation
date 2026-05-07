const Order = require('./Order');
const Payment = require('./Payment');

// Order hasOne Payment
Order.hasOne(Payment, {
    foreignKey: 'order_id',
    sourceKey: 'order_id'
});

// Payment belongsTo Order
Payment.belongsTo(Order, {
    foreignKey: 'order_id',
    targetKey: 'order_id'
});

module.exports = {
    Order,
    Payment
};