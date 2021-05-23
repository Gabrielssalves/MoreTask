const TaskModel = require("../models/taskModel");
const WorkflowModel = require("../models/workflowModel");

const updateTaskStatus = async (idTask, nextStatus = 1) => {
  const workflow = await WorkflowModel.findOne({ Ls_Tasks: idTask });
  console.log(workflow)
  const task = await TaskModel.findById(idTask);
  const status = workflow.Ls_Status.filter(
    (x) => x.Vl_Order === task.Ob_Status.Vl_Order + (nextStatus ? 1 : -1)
  );

  return await task.updateOne(
    {
      Ob_Status: {
        Ds_Status: status[0].Ds_Status,
        Vl_Order: status[0].Vl_Order,
      },
      Ls_Users: status[0].Ls_Users
    },
    { new: true }
  );
};

exports.updateTaskStatus = async (req, res, next) => {
  try {
    const idTask = req.params.idTask;
    const nextStatus = parseInt(req.query.nextStatus || 1);
    const result = await updateTaskStatus(idTask, nextStatus);

    return res.status(200).send({
      message: "User's Tasks",
      task: result,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).send(error);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;

    if (!body.idWorkflow)
      return res.status(400).send({ message: "Enter the workflow id!" });

    const result = await TaskModel.create({
      Nm_Task: body.name,
      Ds_Task: body.description,
      Ob_Status: body.status,
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
