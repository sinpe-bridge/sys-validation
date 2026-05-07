const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Payment = sequelize.define('Payment', {
    payment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
    },
    payment_amount: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    }, 
    payment_user_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    payment_reference_code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    payment_date_time: {
        type: DataTypes.DATE,
        allowNull: false,
    }, 
    payment_create_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'payments',
    timestamps: false,
}); 

module.exports = Payment;