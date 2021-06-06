import React, { useState, useEffect, Fragment } from 'react'
import TaskItem from "./TaskItem"
import AddBtn from "../layout/AddBtn";
import AddTaskModal from "./AddTaskModal";
import EditTaskModal from "./EditTaskModal";
import StaffListModal from "../staff/StaffListModal";

const Workflow = () => {
    const [workflow, setWorkflow] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getWorkflow();
        // eslint-disable-next-line
    }, []);

    const getWorkflow = async () => {
        setLoading(true);
        const res = await fetch("/workflow");
        const data = await res.json();

        setWorkflow(data);
        setLoading(false);
    }

    if (loading) {
        return <h4>Loading...</h4>
    }

    return (
        <Fragment>
            <ul className="collection width-header p-0">
                <li className="collection-header">
                    <h3 className="center">Workflow</h3>
                </li>
                {!loading && workflow.length === 0 ? (
                    <p className="center">No task to show...</p>
                ) : (
                    workflow.map(task => <TaskItem task={task} key={task.id} />)
                )}
            </ul>
            <AddBtn />
            <AddTaskModal />
            <EditTaskModal />
            <StaffListModal />
        </Fragment>
    )
}

export default Workflow