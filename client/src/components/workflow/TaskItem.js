import React from 'react';
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteTask, setCurrent } from "../../actions/taskActions"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import PropTypes from "prop-types";

const TaskItem = ({ task, deleteTask, setCurrent }) => {
    const onDelete = () => {
        confirmAlert({
            title: 'Confirm deletion',
            message: 'Do you really intend to delete this task?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteTask(task.id)
                },
                {
                    label: 'No',
                    onClick: () => console.log("action cancelled")
                }
            ]
        });

    }

    return (
        <li className="collection-item">
            <div>
                <a
                    href="#edit-task-modal"
                    data-bs-toggle="modal"
                    data-bs-target="#edit-task-modal"
                    className={`modal-trigger text-decoration-none h5 ${task.attention ? 'text-danger' : 'text-primary'
                        }`}
                    onClick={() => setCurrent(task)}
                >
                    {task.nm_task}
                </a>
                <br />
                <span className="text-secondary">
                    <span className="text-dark">
                        Id #{task.id} </span>
                         created by [
                    <span className="text-dark">
                        {task.ob_owner}]
                    </span>
                    {' '}on{' '} [<Moment format="MMMM Do YYYY, h:mm A">{task.dt_create}</Moment>]
                </span>
                <a
                    href="#!"
                    className="text-dark"
                    onClick={onDelete}
                >
                    <i className="fa fa-fw fa-trash float-right" style={{ fontSize: '1em' }} />
                </a>
            </div>
        </li>
    )
}

TaskItem.propTypes = {
    task: PropTypes.object.isRequired,
    deleteTask: PropTypes.func.isRequired,
    setCurrent: PropTypes.func.isRequired
}

export default connect(null, { deleteTask, setCurrent })(TaskItem)
