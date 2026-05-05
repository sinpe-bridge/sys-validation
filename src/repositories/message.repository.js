const Message = require('../models/message.model');

// repository to save message data to the database
const r_save_message = async (message_data) => {
    return await Message.create({
        message_sender: message_data.message_sender
    });
};

module.exports = {
    r_save_message
};