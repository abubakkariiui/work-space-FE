import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { deleteTask, getTask } from '../utils/api';
import { PropagateLoader } from 'react-spinners';
import { Toaster, toast } from 'react-hot-toast';

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0); // added offset state
    const [limit] = useState(3); // limit state if you want to change limit dynamically
    const [totalTasks, setTotalTasks] = useState(null);

    const notify = () => {
        toast('Task deleted successfully!', {
            icon: '✅',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await getTask(offset, limit);
                setTasks(response);
                setTotalTasks(response.tasks);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTasks();
    }, [limit, offset]);

    const isNextDisabled = (offset + limit) >= totalTasks;

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this task?');
        if (confirmed) {
            try {
                await deleteTask(id);
                setTasks(tasks.filter((task) => task._id !== id));
                notify();
            } catch (error) {
                console.error(error);
            }
        }
    };

    // functions to handle pagination
    const handleNext = () => {
        setOffset((prevOffset) => prevOffset + limit);
    };

    const handlePrev = () => {
        setOffset((prevOffset) => Math.max(prevOffset - limit, 0));
    };

    return (
        <div className="App">
            {/* Add Task Button */}
            <div>
                <Link to="/add-task">
                    <button className="add-btn"> Add Task </button>
                </Link>
            </div>
            <h1 className="e-list"> Tasks list </h1>
            {loading ? (
                <div className="loader">
                    <br />
                    <PropagateLoader loading={loading} color="#bf63e1" />
                </div>
            ) : (
                <table className="task-table">
                    <thead>
                        <tr>
                            <th>ASSIGNED TO</th>
                            <th>DESCRIPTION</th>
                            <th>PRIORITY</th>
                            <th>COMPLETED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.tasks.map(({ _id, assignedTo, description, priority, completed }) => (
                            <tr key={_id}>
                                <td>{assignedTo ? assignedTo.firstName + ' ' + assignedTo.lastName : 'Not Assigned'}</td>
                                <td>{description}</td>
                                <td>{priority}</td>
                                <td>{completed ? 'completed' : 'pending'}</td>
                                <td>
                                    <Link to={`/update/task/${_id}`}>
                                        <button className="edit-employee-btn">Edit</button>
                                    </Link>
                                    <Link to={`/task/${_id}`}>
                                        <button className="view-employee-btn">View</button>
                                    </Link>
                                    <button className="delete-employee-btn" onClick={() => handleDelete(_id)}>
                                        X
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {/* Pagination buttons */}
            <button onClick={handlePrev} disabled={offset === 0}>
                Previous
            </button>
            <button onClick={handleNext} disabled={isNextDisabled}>
                Next
            </button>
            <Toaster position="top-right" />
        </div>
    );
}

export default Tasks;
