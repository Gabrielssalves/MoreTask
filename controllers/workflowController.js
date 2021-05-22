const WorkflowModel = require("../models/workflowModel");

exports.getUserWorkflows = async (req, res, next) => {
  try {
    const user = req.user;

    const result = await WorkflowModel.find({ Ob_Owner: user.idUser });

    return res.status(200).send({
      message: "User's Workflows",
      workflows: result,
    });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

exports.getUserWorkflowById = async (req, res, next) => {
  try {
    const user = req.user;
    const idWorkflow = req.params.idWorkflow;
    const result = await WorkflowModel.findById(idWorkflow);

    if (result.Ob_Owner.valueOf().toString() !== user.idUser)
      return res.status(400).send({ message: "Workflow not found!" });

    return res.status(200).send({
      message: "Workflow",
      workflows: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error });
  }
};

exports.createWorkflow = async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;

    const result = await WorkflowModel.create({
      Nm_Workflow: body.name,
      Ls_Status: body.statusList,
      Ob_Owner: user.idUser,
    });

    return res.status(201).send({
      message: "Workflow successfully created",
      workflow: result,
    });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};
