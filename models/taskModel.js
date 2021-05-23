const mongoose = require("../database/index");

const TaskSchema = new mongoose.Schema({
  Nm_Task: {
    type: String,
    require: true,
  },
  Ds_Task: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  Ls_Comments: [
    {
      Ob_User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
      },
      Ds_Comment: {
        type: String,
      },
      Dt_Created: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  Ls_Checklist: [
    {
      Ds_Item: {
        type: String,
      },
      Fg_Done: {
        type: Boolean,
      },
    },
  ],
  Ob_Status: {
    Ds_Status: {
      type: String,
    },
    Vl_Order: {
      type: Number
    }
  },
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
  Ls_Users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  ],
});

const TaskModel = mongoose.model("Task", TaskSchema);

module.exports = TaskModel;
