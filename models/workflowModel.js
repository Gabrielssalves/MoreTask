const mongoose = require("../database/index");

const WorkflowSchema = new mongoose.Schema({
  Nm_Workflow: {
    type: String,
    require: true,
  },
  Ls_Tasks: [
    {
      Ob_Task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
      },
    },
  ],
  Ls_Users: [
    {
      Ob_User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
      },
    },
  ],
  Ls_Status: [String],
  Ds_Marking: {
    type: String,
  },
  Ds_Color: {
    type: String,
  },
  Dt_Create: {
    type: Date,
    default: Date.now(),
  },
  Dt_Start: {
    type: Date,
  },
  Dt_Prediction: {
    type: Date,
  },
  Dt_Finish: {
    type: Date,
  },
  Ob_Owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

const WorkflowModel = mongoose.model("Workflow", WorkflowSchema);

module.exports = WorkflowModel;
