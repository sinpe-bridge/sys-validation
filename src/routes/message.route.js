const express = require('express');
const router = express.Router();

const { c_message_validate } = require('../controllers/message.controller');

router.post(
    '/message-validate',
    c_message_validate
);