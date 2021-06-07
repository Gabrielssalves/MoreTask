import { GET_TASKS, SET_LOADING, TASKS_ERROR } from "./types";

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



// Set Loading to True
export const setLoading = () => {
    return {
        type: SET_LOADING
    };
};