const fetchMessages = require('../Controller/Message/FetchMessage');
const  handleSendMessage  = require('../Controller/Message/SendMessage');
const verifyToken = require('../Middleware/VerifyToken');

const router = require('express').Router();


router.post('/send',verifyToken,handleSendMessage)
router.get('/fetch/:to',verifyToken,fetchMessages)

module.exports = router