const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const TaskController = require('../controllers/TaskController')

router.post('/', login.mandatory, TaskController.createTask);

module.exports = router;