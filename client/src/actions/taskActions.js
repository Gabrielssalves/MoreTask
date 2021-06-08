import {
    GET_TASKS,
    SET_LOADING,
    TASKS_ERROR,
    ADD_TASK,
    DELETE_TASK,
    UPDATE_TASK,
    SET_CURRENT,
    CLEAR_CURRENT
} from "./types";

// export const getTasks = () => {
//     return async (dispatch) => {
//         setLoading();

//         const res = await fetch('/workflow');
//         const data = await res.json();

//         dispatch({
//             type: GET_TASKS,
//             payload: data
//         });
//     };
// };

// get tasks from server
export const getTasks = () => async dispatch => {
    try {
        setLoading();

        const res = await fetch('/workflow');
        const data = await res.json();

        dispatch({
            type: GET_TASKS,
            payload: data
        });
    } catch (err) {
        dispatch({
            type: TASKS_ERROR,
            payload: err.response.data
        })
    }
};

// add task to server
export const addTask = (task) => async dispatch => {
    try {
        setLoading();

        const res = await fetch('/workflow', {
            method: "POST",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        dispatch({
            type: ADD_TASK,
            payload: data
        });
    } catch (err) {
        dispatch({
            type: TASKS_ERROR,
            payload: err.response.data
        })
    }
};

// delete task from server
export const deleteTask = (id) => async dispatch => {
    try {
        setLoading();

        await fetch(`/workflow/${id}`, {
            method: "DELETE"
        });

        dispatch({
            type: DELETE_TASK,
            payload: id
        });
    } catch (err) {
        dispatch({
            type: TASKS_ERROR,
            payload: err.response.data
        })
    }
};

// update task from server
export const updateTask = task => async dispatch => {
    try {
        setLoading();

        const res = await fetch(`/workflow/${task.id}`, {
            method: "PATCH", // patch wont destroy dt_create + ob_status + others
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        dispatch({
            type: UPDATE_TASK,
            payload: data
        });
    } catch (err) {
        dispatch({
            type: TASKS_ERROR,
            payload: err.response.data
        })
    }
};

// Set current task
export const setCurrent = task => {
    return {
        type: SET_CURRENT,
        payload: task
    };
};

// Clear current task
export const clearCurrent = () => {
    return {
        type: CLEAR_CURRENT
    };
};

// Set Loading to True
export const setLoading = () => {
    return {
        type: SET_LOADING
    };
};