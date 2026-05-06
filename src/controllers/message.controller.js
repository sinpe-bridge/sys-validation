const { s_save_message, s_get_structured_message } = require('../services/message_service');

const c_message_validate = async (req, res) => {
    try {
        const { message } = req.body;

        const message_sender = s_get_structured_message(message);

        const result = await s_save_message({ message_sender });

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