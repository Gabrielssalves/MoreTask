const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const TaskController = require('../controllers/taskController')

// router.get('/', login.mandatory, TaskController.getUserTasks);
router.post('/', login.mandatory, TaskController.createTask);
router.put('/:idTask', login.mandatory, TaskController.updateTaskStatus);

module.exports = router;