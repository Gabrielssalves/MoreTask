const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const TaskController = require('../controllers/taskController')

// router.get('/', login.mandatory, TaskController.getUserTasks);
router.post('/', login.mandatory, TaskController.createTask);
router.post('/:idTask/comment', login.mandatory, TaskController.createCommentByTaskId);
router.put('/:idTask/status', login.mandatory, TaskController.updateTaskStatus);
router.patch('/:idTask', login.mandatory, TaskController.updateTaskById);
router.patch('/:idTask/', login.mandatory, TaskController.updateTaskById);
router.delete('/:idTask', login.mandatory, TaskController.deleteTaskById);

module.exports = router;