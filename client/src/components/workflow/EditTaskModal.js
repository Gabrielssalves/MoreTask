import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateTask } from "../../actions/taskActions"
import StaffSelectOptions from "../staff/StaffSelectOptions"
import Toast from 'react-bootstrap/Toast'

const EditTaskModal = ({ current, updateTask }) => {
    const [nm_task, setNm_Task] = useState("");
    const [ds_task, setDs_Task] = useState("");
    const [attention, setAttention] = useState(false);
    const [ob_owner, setOb_Owner] = useState("");
    const [dt_start, setDt_Start] = useState(new Date());
    const [dt_prediction, setDt_Prediction] = useState(new Date());
    const [errorToastShow, setErrorToastShow] = useState(false);

    useEffect(() => {
        if (current) {
            setNm_Task(current.nm_task);
            setDs_Task(current.ds_task);
            setAttention(current.attention);
            setOb_Owner(current.taskName);
            setDt_Start(current.dt_start);
            setDt_Prediction(current.dt_prediction);
        }
    }, [current]);

    const onSubmit = () => {
        if (nm_task === "" || ob_owner === "") {
            console.log("vazio");
            setErrorToastShow(true);
        } else {
            const updTask = {
                id: current.id,
                nm_task,
                ds_task,
                attention,
                ob_owner,
                dt_start,
                dt_prediction
            }
            updateTask(updTask);

            //clear fields
            setNm_Task("");
            setDs_Task("");
            setAttention(false);
            setOb_Owner("");
            setDt_Start(new Date());
            setDt_Prediction(new Date());
        }
    }

    return (
        <div className="modal fade" id="edit-task-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Edit Task</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="input-group mb-2">
                            <span className="input-group-text" id="basic-addon1">Task Name</span>
                            <input
                                className="form-control"
                                placeholder="Eg: Deploy Last Version.."
                                type="text"
                                name="nm_task"
                                value={nm_task}
                                onChange={e => setNm_Task(e.target.value)}
                            />
                        </div>
                        <div className="input-group mb-2">
                            <div className="input-group-text">
                                <input
                                    className="form-check-input mt-0"
                                    type="checkbox"
                                    checked={attention}
                                    value={attention}
                                    onChange={e => setAttention(!attention)}
                                />
                            </div>
                            <input
                                disabled
                                type="text"
                                className="form-control"
                                value="Set As Main Task"
                            />
                        </div>
                        <div className="input-group mb-2">
                            <select
                                className="form-select"
                                name="ob_owner"
                                value={ob_owner}
                                onChange={e => setOb_Owner(e.target.value)}
                            >
                                <option defaultValue value="" disabled>Set Assignee</option>
                                <StaffSelectOptions />
                            </select>
                        </div>
                        <div className="form-group mb-2">
                            <div className="col-10 mb-2">
                                <span className="input-group-text" id="basic-addon">Task Starting Date</span>
                                <input
                                    className="form-control"
                                    type="datetime-local"
                                    id="dt_start"
                                    value={dt_start}
                                    onChange={e => setDt_Start(e.target.value)}
                                />
                            </div>
                            <div className="col-10">
                                <span className="input-group-text" id="basic-addon1">Task Forecast Date</span>
                                <input
                                    className="form-control"
                                    type="datetime-local"
                                    id="dt_prediction"
                                    value={dt_prediction}
                                    onChange={e => setDt_Prediction(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="input-group mb-1">
                            <span className="input-group-text" id="basic-addon1">Description</span>
                            <textarea
                                className="form-control"
                                placeholder="Type here a detailed description of the task.."
                                type="text"
                                name="ds_task"
                                value={ds_task}
                                onChange={e => setDs_Task(e.target.value)}
                            />
                        </div>
                        <Toast onClose={() => setErrorToastShow(false)} show={errorToastShow} delay={3000} autohide>
                            <Toast.Header>
                                <strong className="me-2">Validation Error {' '}</strong>
                            </Toast.Header>
                            <Toast.Body>Please Insert a Name and Assignee for the Task</Toast.Body>
                        </Toast>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal">
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={onSubmit}
                            data-bs-dismiss="modal">
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

EditTaskModal.propTypes = {
    current: PropTypes.object,
    updateTask: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    current: state.task.current
})

export default connect(mapStateToProps, { updateTask })(EditTaskModal)