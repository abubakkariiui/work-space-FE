import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSingleTask } from '../utils/api';

const SingleTask = () => {

  const [task, setTask] = useState()
  const { id } = useParams();

  useEffect(() => {
    getSingleTask(id).then((res) => {
      setTask(res)
    }).catch(err => {
      console.log(err);
    })
  }, [id])

  return (
    <div className="AppBar">
      <h1 className='e-list'> Single Task details</h1>
      {task && (
        <div className="employee-container">
          <h2>{task.assignedTo.firstName} {task.assignedTo.lastName}</h2>
          <h3>Department: {task.assignedTo.department}</h3>
          <h3 className='e-list'>Tasks details</h3>
          <ul className="task-list">
            <li className={`task-item ${task.priority.toLowerCase()}`}>
              <p>Task Name: {task.description}</p>
              <p>Priority: {task.priority}</p>
              <p>Status: {task.completed ? 'Completed' : 'Incomplete'}</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default SingleTask