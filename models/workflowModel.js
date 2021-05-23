const mongoose = require("../database/index");

const WorkflowSchema = new mongoose.Schema({
  Nm_Workflow: {
    type: String,
    require: true,
  },
  Ls_Tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task"
    }
  ],
  Ls_Status: [
    {
      Ds_Status: {
        type: String,
        require: true,
      },
      Vl_Order: {
        type: Number,
        require: true
      },
      Ls_Users: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
      ],
    }
  ],
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
