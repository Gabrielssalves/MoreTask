const TaskModel = require("../models/taskModel");
const WorkflowModel = require("../models/workflowModel");
const UserModel = require("../models/userModel");


const updateTaskStatus = async (idTask, nextStatus = 1) => {
  const workflow = await WorkflowModel.findOne({ Ls_Tasks: idTask });
  console.log(workflow);
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
    console.log(error);
    return res.status(500).send(error);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;
    const idWorkflow = body.idWorkflow;

    if (!idWorkflow)
      return res.status(400).send({ message: "Enter the workflow id!" });

    const workflow = await WorkflowModel.findById(idWorkflow);
    const status = workflow.Ls_Status.filter((x) => x.Vl_Order === 0);

    const result = await TaskModel.create({
      Nm_Task: body.name,
      Ds_Task: body.description,
      Ob_Status: status[0],
      Ob_User: body.user,
      Ob_Owner: user.idUser,
      Dt_Prediction: body.dtPrediction,
      Ds_Status_Task: body.status,
      Dt_Start: body.dtStart,
      Dt_Create: body.dtCreate
    });

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

exports.updateTaskById = async (req, res, next) => {
  try {
    const body = req.body;
    const idTask = req.params.idTask;
    var task = {};

    if (!idTask) return res.status(400).send({ message: "Enter the task id!" });

    if (body.name)
      task.Nm_Task = body.name
    if (body.description)
      task.Ds_Task = body.description
    if (body.dtPrediction)
      task.Dt_Prediction = body.dtPrediction
    if (body.status)
      task.Ds_Status_Task = body.status
    if (body.user)
      task.Ob_User = body.user
    if (body.dtCreated)
      task.Dt_Create = body.dtCreate

    const result = await TaskModel.findByIdAndUpdate(
      idTask,
      task,
      { new: true}
    ).populate('Ob_User');

    return res.status(201).send({
      message: "Task successfully updated",
      task: result,
    });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

exports.deleteTaskById = async (req, res, next) => {
  try {
    const idTask = req.params.idTask;

    await TaskModel.findByIdAndDelete(idTask);

    return res.status(201).send({
      message: "Task sucessfully deleted",
    });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

exports.createCommentByTaskId = async (req, res, next) => {
  try {
    const login = req.user.login;
    const body = req.body;
    const idTask = req.params.idTask;

    if (!idTask) return res.status(400).send({ message: "Enter the task id!" });

    const result = await TaskModel.findById(idTask);

    if (!result) return res.status(400).send({ message: "Task not found!" });

    const dataUser = await UserModel.findOne({ Ds_Login: login });

    const comment = {
      Ob_User: dataUser,
      Ds_Comment: body.dsComment,
      Dt_Created: new Date().toISOString().slice(0, 19).replace("T", " "),
    };

    let lsComments = result.Ls_Comments;

    lsComments.push(comment);

    await result.updateOne(
      {
        Ls_Comments: lsComments,
      },
      { new: true }
    );

    return res.status(201).send({
      message: "Task successfully updated",
      task: result,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ error: error });
  }
};
