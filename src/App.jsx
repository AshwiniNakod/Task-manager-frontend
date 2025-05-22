
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import Login from './components/Login'
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import EditForm from './components/EditForm';

function App() {
  return (
    <>
    
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/taskList" element={<TaskList/>} />
        <Route path="/taskForm" element={<TaskForm/>} />
        <Route path="/editForm/:id" element={<EditForm/>} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
    <ToastContainer position="top-right" autoClose={3000} />

    </>
  )
}

export default App
