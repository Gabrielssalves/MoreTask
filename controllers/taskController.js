const TaskModel = require("../models/taskModel");
const WorkflowModel = require("../models/workflowModel");

exports.createTask = async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;

    if (!body.idWorkflow)
      return res.status(400).send({ message: "Enter the workflow id!" });

    const result = await TaskModel.create({
      Nm_Task: body.name,
      Ds_Task: body.description,
      Ds_Status: body.status,
      Ob_Owner: user.idUser,
    });

    let workflow = await WorkflowModel.findById(body.idWorkflow);
    workflow.Ls_Tasks.push(result);
    workflow.save();

    return res.status(201).send({
      message: "Task successfully created",
      task: result,
    });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};
