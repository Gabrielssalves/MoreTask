const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const userController = require('../controllers/userController')

router.get('/', userController.getUsers);

router.post('/register', userController.createUser);

router.post('/login', userController.loginUser);

router.patch('/', login.mandatory, userController.updateUser);

router.delete('/', login.mandatory, userController.deleteUser);



module.exports = router;