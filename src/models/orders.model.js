const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    order_amount: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    order_status: { //'pending', 'processed','expired', 'failed'
        type: DataTypes.STRING(20), 
        allowNull: false,
    },
    order_phone_number_client: {
        type: DataTypes.STRING(15),
    },
    order_create_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'orders',
    timestamps: false,
});

module.exports = Order;