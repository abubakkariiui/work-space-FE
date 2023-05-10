import './App.css';
import Home from './Components/Home';
import Nav from './Components/Nav';
import Employees from './Components/Employees';
import AddEmployee from './Components/AddEmployee';
import Tasks from './Components/Tasks';
import AddTask from './Components/AddTask';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SingleEmployee from './Components/SingleEmployee';
import SingleTask from './Components/SingleTask';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/update/employee/:id" element={<AddEmployee />} />
          <Route path="/employee/:id" element={<SingleEmployee />} />
          <Route path="/task/:id" element={<SingleTask />} />
          <Route path="/update/task/:id" element={<AddTask />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
