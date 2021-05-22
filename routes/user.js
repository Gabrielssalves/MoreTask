const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const userController = require('../controllers/userController')

router.post('/register', userController.createUser);

router.post('/login', userController.loginUser);

module.exports = router;