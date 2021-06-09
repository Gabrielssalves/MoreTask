import React, { useState, useEffect, Fragment } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { getTasks, updateTask } from "../../actions/taskActions"

const TaskScreen = ({ getTasks, task: { tasks, loading }, updateTask }) => {
    const [ds_status, setDs_Status] = useState("");

    useEffect(() => {
        getTasks();
        // eslint-disable-next-line
    }, []);

    if (loading || tasks === null) {
        return <h4>Loading...</h4>
    }

    const onSubmit = () => {
        const updTask = {
            id: tasks[0].id,
            ds_status
        }
        updateTask(updTask);
    }

    return (
        <Fragment>
            <ul className="collection with-header w-75 p-0 mt-4 ms-5">
                <li className="collection-header">
                    <i className="fa fa-fw fa-thumbtack ms-1 mt-2" />
                    <span className="h6 mt-2 text-secondary"> Current Task</span>
                </li>
                {!loading && tasks.length === 0 ? (
                    <p className="center">
                        No task to show...
                    </p>
                ) : (
                    <Fragment>
                        <div>
                            <li className="collection-item center">
                                <h5>{tasks[0].nm_task}</h5>
                            </li>

                            <li className="collection-item">
                                <span className="h6 ms-1 text-secondary">Task Description</span>
                                <br />
                                <textarea
                                    className="form-control form-control-lg code-text mt-2"
                                    rows="10"
                                    disabled readOnly
                                    value={tasks[0].ds_task}
                                >
                                </textarea>
                            </li>

                            <li className="collection-item ">
                                <span className="text-secondary">
                                    <span className="text-dark">Created by: </span>
                                    {tasks[0].ob_owner}
                                    <br />
                                    <span className="text-dark">Created on: </span>
                                    <Moment format="MMMM Do YYYY, h:mm A">{tasks[0].dt_create}</Moment>
                                    <br />
                                    <span className="text-dark">Activity Started on: </span>
                                    <Moment format="MMMM Do YYYY, h:mm A">{tasks[0].dt_start}</Moment>
                                    <br />
                                    <span className="text-dark">Forecast Date: </span>
                                    <Moment format="MMMM Do YYYY, h:mm A">{tasks[0].dt_start}</Moment>
                                </span>
                            </li>
                            <li className="collection-item pb-4 mb-2">
                                <span className="h6 ms-1 text-secondary">Task Status</span>
                                <select
                                    className="form-select mt-3"
                                    name="ds_status"
                                    value={tasks[0].ds_status}
                                    onChange={e => setDs_Status(e.target.value)}
                                >
                                    <option defaultValue value="" disabled>Set Assignee</option>
                                    <option value="On Hold">On Hold</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                                <button
                                    type="button"
                                    className="btn btn-primary float-end me-1 my-2"
                                    onClick={onSubmit}
                                >
                                    Update Status
                                </button>
                                <br /><br />
                            </li>
                            <li className="collection-item">
                                <span className="h6 ms-4 text-secondary">Comments</span>
                            </li>

                            {/* <li>
                                //add comments
                            </li> */}

                            <li>
                                <div className="mx-4 mt-3">
                                    <textarea
                                        className="form-control"
                                        placeholder="Add new comment..."
                                        type="text"
                                        name="taskDescription"
                                        rows="5"
                                    />
                                </div>
                                <button type="button" className="btn btn-primary float-end me-4 my-2">Send</button>
                            </li>
                        </div>

                    </Fragment>
                )}
            </ul>
        </Fragment>
    )
}

TaskScreen.propTypes = {
    getTasks: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    task: state.task
})

export default connect(
    mapStateToProps,
    { getTasks, updateTask }
)(TaskScreen)