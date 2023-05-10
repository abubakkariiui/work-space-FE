import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { deleteTask, getTask } from '../utils/api'
import { PropagateLoader } from 'react-spinners';
import { Toaster, toast } from 'react-hot-toast';

function Tasks() {

    const [task, setTask] = useState([])
    const [loading, setLoading] = useState(true)

    const notify = () => toast('Task deleted successfully!', {
        icon: '✅',
        style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
        },
    });

    useEffect(() => {
        getTask().then(res => {
            setTask(res)
            setTimeout(() => setLoading(false), 1000);
        }).catch(err => console(err))
    }, [])

    const handleDelete = (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this employee?');
        if (confirmed) {
            deleteTask(id).then(res => {
                console.log('delete task');
                setTask(task.filter((t) => t._id !== id));
                notify()
            }).catch(err => {
                console.log(err);
            })
        }
    }


    return (
        <div className="App">
            {/* Add Task Button */}
            <div>
                <Link to='/add-task'>
                    <button className='add-btn'> Add Task </button>
                </Link>
            </div>
            <h1 className='e-list'> Tasks list </h1>
            {
                loading ? (
                    <div className="loader">
                        <br />
                        <PropagateLoader loading={loading} color="#bf63e1" />
                    </div>
                ) : (
                    <table className='task-table'>

                        <thead>
                            <th>ASSIGNED TO</th>
                            <th>DESCRIPTION</th>
                            <th>PRIORITY</th>
                            <th>COMPLETED</th>
                            <th>ACTIONS</th>
                        </thead>

                        <tbody>
                            {
                                task && task.map(({ _id, assignedTo, description, priority, completed }, index) => (

                                    <tr key={index}>
                                        <td>{assignedTo ? assignedTo.firstName + ' ' + assignedTo.lastName : 'Not Assigned'}</td>
                                        <td>{description}</td>
                                        <td>{priority}</td>
                                        <td>{completed ? 'completed' : 'pending'}</td>
                                        <td>
                                            <Link to={`/update/task/${_id}`}>
                                                <button className='edit-employee-btn'>Edit</button>
                                            </Link>
                                            <Link to={`/task/${_id}`}>
                                                <button className='view-employee-btn'>View</button>
                                            </Link>
                                            <button className='delete-employee-btn' onClick={() => handleDelete(_id)}>X</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>

                    </table>
                )}
            <Toaster position='top-right' />
        </div>
    )
}

export default Tasks;