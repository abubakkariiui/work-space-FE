import React, { useEffect, useState } from 'react';
import { createTask, getEmployee, getSingleTask, updateTask } from '../utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';

function AddTask() {
    const [taskId, setTaskId] = useState(null)
    const [assignedTo, setAssignedTo] = useState("")
    const [description, setDescription] = useState('');
    const [employees, setEmployees] = useState([]);
    const [priority, setPriority] = useState('');
    const [completed, setCompleted] = useState(false)

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getTask(id)
            setTaskId(id)
        }
        getEmployee().then(res => {
            setEmployees(res)
        })

    }, [id])

    const getTask = (taskId) => {
        getSingleTask(taskId).then(res => {
            const { assignedTo, description, priority, completed } = res;
            setAssignedTo(assignedTo._id)
            setDescription(description);
            setPriority(priority);
            setCompleted(completed);
        }).catch(err => {
            console.log(err);
        })
    }

    const checkHandler = () => {
        setCompleted(!completed);
    }

    const saveTask = (e) => {
        e.preventDefault();
        if (taskId) {
            const task = { assignedTo, description, priority, completed };
            updateTask(taskId, task).then(res => {
                navigate('/tasks')
                console.log('Task updated successfully');
            }).catch(err => {
                console.log(err);
            })
        } else {
            const task = { assignedTo, description, priority, completed };
            createTask(task).then(res => {
                navigate('/tasks')
                console.log("Task Added successfully");
            }).catch(err => {
                console.log(err);
            })
        }
    }

    const handleAssignToChange = e => {
        const employeeId = e.target.value;
        setAssignedTo(employeeId);
    };

    return (
        <div className='App'>
            <h1>Add Task</h1>
            <div className='card-body'>
                <form>
                    <div className="form-group">
                        <label className="form-label"> Assign to: </label>
                        <select
                            className="form-control"
                            value={assignedTo}
                            onChange={handleAssignToChange}
                        >
                            <option value="">Select an employee</option>
                            {employees &&
                                employees.map(({ _id, firstName, lastName }) => (
                                    <option key={_id} value={_id}>
                                        {firstName} {lastName}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className='form-group'>
                        <label className='form-label'> Description: </label>
                        <input
                            className='form-control'
                            type='text'
                            placeholder='Enter Description'
                            name='description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        >
                        </input>
                    </div>

                    <div className='form-group'>
                        <label className='form-label'> Priority: </label>
                        <select
                            className='form-control'
                            name='priority'
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value='' selected disabled>Select Priority</option>
                            <option value='Low'>Low</option>
                            <option value='Medium'>Medium</option>
                            <option value='High'>High</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label className='form-label'> Completion Status: </label>
                        <input
                            className='checkbox-control'
                            type='checkbox'
                            placeholder='Completed?'
                            name='completionStatus'
                            value={completed}
                            onChange={checkHandler}
                            checked={completed}
                        >
                        </input>
                    </div>
                    <button className='submit-form-btn' onClick={(e) => saveTask(e)}>Submit</button>
                </form>
            </div>
        </div>
    )

}

export default AddTask;