const message_repository = require('../repositories/message.repository');
const Message = require('../models/message');

// service to save message data to the database
const s_save_message = async (message_data) => {
    if (!message_data.message_sender) {
        throw new Error("message_sender is required");
    }
    return await message_repository.r_save_message(message_data);
};

// service to extract structured data from the message text
const s_get_structured_message = async (message) => {
    
    // extract amount
    const amountMatch = text.match(/recibido\s([\d,]+\.\d{2})/i);
    const amount = amountMatch ? amountMatch[1] : null;

    // extract name
    const nameMatch = text.match(/de\s([A-Z\s]+)\s+por/i);
    const name = nameMatch ? nameMatch[1].trim() : null;

    // extract reference code
    const refMatch = text.match(/Referencia\s(\d+)/i);
    const reference = refMatch ? refMatch[1] : null;

    // extract date and time from reference code
    let date = null;
    if (reference && reference.length >= 14) {
        const year = reference.substring(0, 4);
        const month = reference.substring(4, 6);
        const day = reference.substring(6, 8);
        const hour = reference.substring(8, 10);
        const minute = reference.substring(10, 12);
        const second = reference.substring(12, 14);
        date = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    };
    
    return new Message({
        message_amount: amount,
        message_user_name: name,
        message_reference_code: reference,
        message_status: 'pending',
        message_date_time: date
    });
};

// service to verify if a message with the same reference code already exists
const s_verify_exists_reference_code = async (reference_code) => {
    const existingMessage = await message_repository.r_get_message(reference_code);
    return !!existingMessage;
};

// service to verify the time that the message was sent, if it's more than 15 minutes, it will be marked as failed
const s_verify_message_time = async (message) => {
    const currentTime = new Date();
    const messageTime = new Date(message.message_date_time);
    const timeDifference = (currentTime - messageTime) / 1000;
    if (timeDifference > 900) { // 15 minutes
        message.message_status = 'failed';
        await message.save();
    }
    return message;
};

module.exports = {
    s_save_message,
    s_get_structured_message,
    s_verify_exists_reference_code,
    s_verify_message_time
};