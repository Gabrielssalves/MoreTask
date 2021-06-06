// import React, { useState, useEffect, Fragment } from 'react'

// const TaskScreen = () => {
//     const [user, setUser] = useState([]);
//     const [task, setTask] = useState([]);
//     const [loading, setLoading] = useState(false);


//     useEffect(() => {
//         getUser();        
//         // eslint-disable-next-line
//     }, []);

//     const getUser = async () => {
//         setLoading(true);
//         const res = await fetch("/users");
//         const data = await res.json();
//         setUser(data[0]);    
//         setLoading(false);
//         return getTask();
//     }
    
//     const getTask = async () => {
//         const res = await fetch("/workflow");
//         const data = await res.json();

//         // data.map(data => console.log(data.ob_owner_id));
//         data.map(data => data.ob_owner_id === user.id && setTask(data));
//     }


//     if (loading) {
//         return <h4>Loading...</h4>
//     }

//     return (
//         <Fragment>
//             <ul className="collection width-header p-0">
//                 <li className="collection-header">
//                     <h3 className="text-dark center">
//                         {user.name}'s {task.id}
//                     </h3>
//                     <h3 className="center">Current Task</h3>
//                 </li>
//                 {!loading && task.length === 0 ? (
//                     <p className="center">
//                         No task to show...
                    
//                     </p>
                    
//                 ) : (
//                     <span className="text-dark">
//                     </span>
//                 )}
//             </ul>
//         </Fragment>
//     )
// }

// export default TaskScreen