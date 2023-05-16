import axios from 'axios';

const baseUrl = 'http://localhost:5000'

function getEmployee() {
    return axios.get(baseUrl + '/api/employee/getEmployee')
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            throw error;
        });
}

function createEmployee(employeeData) {
    return axios.post(baseUrl + '/api/employee/addEmployee', employeeData)
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            throw error;
        });
}

function updateEmployee(taskId, taskData) {
    return axios.put(`${baseUrl}/api/employee/edit/${taskId}`, taskData)
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            throw error;
        });
}


function getSingleEmployee(id) {
    return axios.get(baseUrl + `/api/employee/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            throw error;
        });
}

function deleteEmployee(id) {
    return axios.delete(baseUrl + `/api/employee/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            throw error;
        });
}


// task api reqests

function getTask(offset = 0, limit = 10) {
    return axios
        .get(`${baseUrl}/api/task/getTask?offset=${offset}&limit=${limit}`)
        .then((response) => response.data)
        .catch((error) => {
            console.error(error);
            throw error;
        });
}


function createTask(taskData) {
    return axios.post(baseUrl + '/api/task/addTask', taskData)
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            throw error;
        });
}

function updateTask(taskId, taskData) {
    return axios.put(`${baseUrl}/api/task/edit/${taskId}`, taskData)
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            throw error;
        });
}


function getSingleTask(id) {
    return axios.get(baseUrl + `/api/task/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            throw error;
        });
}

function deleteTask(id) {
    return axios.delete(baseUrl + `/api/task/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            throw error;
        });
}


export {
    getEmployee,
    createEmployee,
    getSingleEmployee,
    deleteEmployee,
    getTask,
    createTask,
    getSingleTask,
    deleteTask,
    updateEmployee,
    updateTask
}