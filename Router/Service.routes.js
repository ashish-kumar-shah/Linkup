const uploadProfileAvatar = require("../Controller/Auth/UpdateAvtar");
const { markMessagesAsRead } = require("../Controller/Message/MarkRead");
const fetchUserById = require("../Controller/Services/FetchUserById");
const handleFetchUser = require("../Controller/Services/handleSendUser");
const handleUpdateField = require("../Controller/Services/HandleUpdateField.");
const upload = require("../Middleware/Upload");
const verifyToken = require("../Middleware/VerifyToken");

const router = require("express").Router();

router.get('/fetchUser',verifyToken,handleFetchUser)
router.get('/fetchUser/:id',verifyToken,fetchUserById)
router.post('/markseen',verifyToken,markMessagesAsRead)
router.patch('/updateavtar',verifyToken,upload.single('file'),uploadProfileAvatar)
router.patch('/updatefields',verifyToken,handleUpdateField)

module.exports = router