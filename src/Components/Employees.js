import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { deleteEmployee, getEmployee } from '../utils/api'
import { PropagateLoader } from 'react-spinners';
import { Toaster, toast } from 'react-hot-toast';

function Employees() {

    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(true)


    const notify = () => toast('Employee deleted successfully!', {
        icon: '✅',
        style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
        },
    });

    useEffect(() => {
        getEmployee()
            .then(employee => {
                setEmployees(employee)
                setTimeout(() => setLoading(false), 1000);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    const handleDelete = (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this employee?');
        if (confirmed) {
            deleteEmployee(id).then(res => {
                console.log('delete employee');
                setEmployees(employees.filter((employee) => employee._id !== id));
                notify()
            }).catch(err => {
                console.log(err);
            })
        }
    }

    return (
        <div>
            {/* Add new employee */}
            <div>
                <Link to='/add-employee'>
                    <button className='add-btn'> Add Employee </button>
                </Link>
            </div>
            <h1 className='e-list'> Employees list</h1>
            {loading ? (
                <div className="loader">
                    <br />
                    <PropagateLoader loading={loading} color="#bf63e1" />
                </div>
            ) : (
                <table>
                    <thead key="header">
                        <th>ID</th>
                        <th>NAME</th>
                        <th>DEPARTMENT</th>
                        <th>ACTIONS</th>
                    </thead>
                    <tbody>
                        {employees.map(({ _id, firstName, lastName, department }, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{`${firstName} ${lastName}`}</td>
                                <td>{department}</td>
                                <td>
                                    <Link to={`/update/employee/${_id}`}>
                                        <button className="edit-employee-btn">Edit</button>
                                    </Link>
                                    <Link to={`/employee/${_id}`}>
                                        <button className="view-employee-btn">View</button>
                                    </Link>
                                    <button className="delete-employee-btn" onClick={() => handleDelete(_id)}>X</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <Toaster position='top-right' />
        </div>
    )
}

export default Employees;