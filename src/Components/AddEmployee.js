import React, { useEffect, useState } from 'react';
import { createEmployee, getSingleEmployee, getTask, updateEmployee } from '../utils/api';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';

function AddEmployee() {
    const [employeeId, setEmployeeId] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [department, setDepartment] = useState('');
    const [tasks, setTasks] = useState([]);
    const [taskIds, setTaskIds] = useState([]);

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            setEmployeeId(id);
            getEmployee(id);
        }
        getTask()
            .then((res) => {
                setTasks(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const getEmployee = (employeeId) => {
        getSingleEmployee(employeeId)
            .then((res) => {
                const { firstName, lastName, department, tasks } = res;
                setFirstName(firstName);
                setLastName(lastName);
                setDepartment(department);
                setTaskIds(tasks.map((task) => task._id));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const saveEmployee = (e) => {
        e.preventDefault();
        if (employeeId) {
            const employee = { firstName, lastName, department, tasks: taskIds };
            updateEmployee(employeeId, employee)
                .then((res) => {
                    navigate('/employees');
                    console.log('Employee updated successfully');
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            const employee = { firstName, lastName, department };
            createEmployee(employee)
                .then((res) => {
                    navigate('/employees');
                    console.log('Employee created successfully');
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <div className="App">
            <h1>Add Employee</h1>
            <div className="card-body">
                <form>
                    <div className="form-group">
                        <label className="form-label">First Name:</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Enter First Name"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Last Name:</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Enter Last Name"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Department:</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Enter Department"
                            name="department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        />
                    </div>

                    {employeeId && (
                        <div className="form-group">
                            <label className="form-label">Tasks:</label>
                            <select
                                className="form-control"
                                value={taskIds.join(',')}
                                onChange={(e) =>
                                    setTaskIds(Array.from(e.target.selectedOptions, (option) => option.value))
                                }
                            >
                                <option defaultValue="Select a task">Select a task</option>
                                {Array.isArray(tasks) && tasks.length > 0 && tasks.map((task) => (
                                    <option key={task._id} value={task._id}>
                                        {task.description}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <button className="submit-form-btn" onClick={(e) => saveEmployee(e)}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddEmployee;
