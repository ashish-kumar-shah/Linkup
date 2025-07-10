const authUser = require("../Controller/Auth/AuthenticatUser");
const logout = require("../Controller/Auth/logout");
const { handleSignInUp } = require("../Controller/Auth/Sign.In.Up");
const UpdateUserFields = require("../Controller/Auth/UpdateFields");
const verifyToken = require("../Middleware/VerifyToken");

const router = require("express").Router();



router.post('/signinup',handleSignInUp);
router.get('/verify',verifyToken,authUser)
router.post('/updatefield',verifyToken,UpdateUserFields)
router.get('/logout',verifyToken,logout)


module.exports = router