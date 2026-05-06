const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Message = sequelize.define('Message', {
    message_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    message_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }, 
    message_user_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    message_reference_code: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    message_status: { //'pending', 'processed', 'failed'
        type: DataTypes.STRING(20), 
        allowNull: false,
    },
    message_date_time: {
        type: DataTypes.DATE,
        allowNull: false,
    }, 
    message_create_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'messages',
    timestamps: false,
}); 

module.exports = Message;