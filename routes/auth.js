const router = require('express').Router();
const authController = require('../controllers/auth')

//USER REGISTER
router.post('/register',authController.userRegister)

//USER LOGIN
router.post('/login',authController.userLogin);

//USER CHANGE PASSWORD
router.put('/changepassword',authController.userUpdatePassword);
module.exports = router;