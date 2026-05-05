const message_repository = require('../repositories/message.repository');

// service to save message data to the database
const s_save_message = async (message_data) => {
    if (!message_data.message_sender) {
        throw new Error("message_sender is required");
    }
    return await message_repository.r_save_message(message_data);
};

module.exports = {
    s_save_message
};