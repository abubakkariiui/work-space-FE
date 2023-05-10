import React, { useEffect, useState } from 'react';
import './SingleEmployee.css'
import { getSingleEmployee } from '../utils/api';
import { useParams } from 'react-router-dom';

function SingleEmployee() {
    const [employee, setEmployee] = useState()

    const { id } = useParams();

    useEffect(() => {
        getSingleEmployee(id).then((res) => {
            setEmployee(res)
        }).catch(err => {
            console.log(err);
        })
    }, [id])

    return (
        <div className="AppBar">
            <h1 className='e-list'> Single Employee details</h1>
            {employee && (
                <div className="employee-container">
                    <h2>{employee.firstName} {employee.lastName}</h2>
                    <h3>Department: {employee.department}</h3>
                    <h3 className='e-list'>Tasks detials</h3>
                    <ul className="task-list">
                        {employee.tasks.map((task, index) => (
                            <li key={index} className={`task-item ${task.priority.toLowerCase()}`}>
                                <p>Task Name: {task.description}</p>
                                <p>Priority: {task.priority}</p>
                                <p>Status: {task.completed ? 'Completed' : 'Incomplete'}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default SingleEmployee;
