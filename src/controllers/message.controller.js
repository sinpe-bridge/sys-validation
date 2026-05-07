const { s_save_message, s_get_structured_message, s_verify_message_time, s_verify_exists_reference_code } = require('../services/message.service');
const { s_verify_order_exists } = require('../services/order.service');

const c_message_validate = async (req, res) => {
    try {
        const { data_phone_number, data_phone_message } = req.body;

        const message_sender = s_get_structured_message(data_phone_message);

        const result = await s_save_message(message_sender);

        const verifyExists = await s_verify_exists_reference_code(message_sender.message_reference_code);
        
        if (verifyExists) {
            return res.status(400).json({
                error: "Reference code already exists"
            });
        }

        const verifyTime = await s_verify_message_time(message_sender);
        if (!verifyTime) {
            return res.status(400).json({
                error: "Order has expired, approve manually"
            });
        }

        const verifyOrder = await s_verify_order_exists(data_phone_number, message_sender.message_amount);

        if (verifyOrder) {
        }

    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
}

module.exports = {
    c_message_validate
};