const WorkflowModel = require("../models/workflowModel");

exports.getUserWorkflows = async (req, res, next) => {
  try {
    const user = req.user;

    const result = await WorkflowModel.find({ Ob_Owner: user.idUser })    
      .populate('Ls_Tasks')
      .populate('Ob_Owner')
      .exec();

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
    const result = await WorkflowModel.findById(idWorkflow).populate('Ob_User');

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
      Dt_Start: body.dtStart,
      Dt_Prediction: body.dtPrediction,
      Ob_Owner: user.idUser,
    }, {new: true});

    return res.status(201).send({
      message: "Workflow successfully created",
      workflow: result,
    });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

exports.updateWorkflowStatus = async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;
    const idWorkflow = req.params.idWorkflow;

    const result = await WorkflowModel.findById(idWorkflow);
    if (result.Ob_Owner.valueOf().toString() !== user.idUser)
      return res.status(400).send({ message: "Workflow not found!" });

    await result.updateOne({ Ls_Status: body.statusList }, { new: true });

    return res.status(201).send({
      message: "Workflow's status sucessfully updated",
      workflow: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error });
  }
};

exports.updateWorkflowById = async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;
    const idWorkflow = req.params.idWorkflow;

    const result = await WorkflowModel.findById(idWorkflow);
    if (result.Ob_Owner.valueOf().toString() !== user.idUser)
      return res.status(400).send({ message: "Workflow not found!" });

    await result.updateOne({ 
      Nm_Workflow: body.name,
      Ls_Status: body.statusList,
      Dt_Start: body.dtStart,
      Dt_Prediction: body.dtPrediction,
      Ob_Owner: user.idUser
    }, { new: true });

    return res.status(201).send({
      message: "Workflow sucessfully updated",
      workflow: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error });
  }
};

exports.deleteWorkflowById = async (req, res, next) => {
  try {
    const user = req.user;
    const idWorkflow = req.params.idWorkflow;

    const result = await WorkflowModel.findById(idWorkflow);
    if (result.Ob_Owner.valueOf().toString() !== user.idUser)
      return res.status(400).send({ message: "Workflow not found!" });

    await result.deleteOne();

    return res.status(201).send({
      message: "Workflow sucessfully deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error });
  }
};
