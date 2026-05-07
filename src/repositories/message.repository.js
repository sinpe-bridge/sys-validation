const Payment = require('../models/payment.model');

// repository to save payment data to the database
const r_save_payment = async (payment_data) => {
    return await Payment.create(payment_data);
};

// repository to get payment by reference code
const r_get_payment = async (reference_code) => {
    const verifyExists = await Payment.findOne({
        where: {
            payment_reference_code: reference_code
        }
    });
    return verifyExists;
};

module.exports = {
    r_save_payment,
    r_get_payment,
};