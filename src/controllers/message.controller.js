const { or } = require('sequelize');
const { s_save_message, s_get_structured_message, s_verify_message_time, s_verify_exists_reference_code } = require('../services/message.service');
const { s_get_order_by_phone_and_amount, s_update_order_status } = require('../services/order.service');

const c_message_validate = async (req, res) => {
    try {
        const { data_phone_number, data_phone_message } = req.body;

        const message_sender = s_get_structured_message(data_phone_message);

        // verify if order exists based on phone and amount
        const order = await s_get_order_by_phone_and_amount(data_phone_number, message_sender.message_amount);

        if (!!order) {
            message_sender.order_id = order.id;
        }

        const verifyExists = await s_verify_exists_reference_code(message_sender.message_reference_code);
        
        if (verifyExists) {
            await s_update_order_status(message_sender.order_id, 'failed');
            return res.status(400).json({
                error: "Reference code already exists"
            });
        }

        const verifyTime = await s_verify_message_time(message_sender);
        if (!verifyTime) {
            await s_update_order_status(message_sender.order_id, 'pending');
            return res.status(400).json({
                error: "Order has expired, approve manually"
            });
        }

        // save message in database
        const result = await s_save_message(message_sender);

        return res.status(200).json({
            message: "Message saved successfully",
            data: result
        });

    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
}

module.exports = {
    c_message_validate
};