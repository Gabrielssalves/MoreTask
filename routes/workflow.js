const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const WorkflowController = require('../controllers/workflowController')

router.get('/', login.mandatory, WorkflowController.getUserWorkflows);
router.get('/:idWorkflow', login.mandatory, WorkflowController.getUserWorkflowById);
router.post('/', login.mandatory, WorkflowController.createWorkflow);
router.put('/:idWorkflow/status', login.mandatory, WorkflowController.updateWorkflowStatus);
router.patch('/:idWorkflow', login.mandatory, WorkflowController.updateWorkflowById);
router.delete('/:idWorkflow', login.mandatory, WorkflowController.deleteWorkflowById);

module.exports = router; 