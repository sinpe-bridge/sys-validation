const Message = require('../models/message.model');

// repository to save message data to the database
const r_save_message = async (message_data) => {
    return await Message.create({
        message_sender: message_data.message_sender
    });
};

// repository to get message by reference code
const r_get_message = async (reference_code) => {
    const verifyExists = await Message.findOne({
        where: {
            message_reference_code: reference_code
        }
    });
    return verifyExists;
};

module.exports = {
    r_save_message,
    r_get_message
};