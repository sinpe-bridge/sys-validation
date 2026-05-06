const { s_save_message, s_get_structured_message, s_verify_message_time } = require('../services/message_service');

const c_message_validate = async (req, res) => {
    try {
        const { message } = req.body;

        const message_sender = s_get_structured_message(message);

        const result = await s_save_message(message_sender);

        const verifyExists = await s_verify_exists_reference_code(message_sender.message_reference_code);
        
        if (verifyExists) {
            return res.status(400).json({
                error: "Reference code already exists"
            });
        }

        const verifyTime = await s_verify_message_time(message_sender);

        if (verifyTime.message_status === 'failed') {
            return res.status(400).json({
                error: "Message time is more than 15 minutes, marked as failed"
            });
        }

        return res.status(201).json({
            message: "Successfully saved message",
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